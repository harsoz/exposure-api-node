import { Status } from "../../../core/database.interface";
import { IDatabaseResponse, IParam } from "../../../core/database.interface";
import { IRepository } from "../../../core/repository.interface";
import { DllParamsRepository } from "../../../database/repositories/dllParams.repository";
import { DllsRepository } from "../../../database/repositories/dlls.repository";
import { RepositoryFactory } from "../../../database/repositoryFactory.class";
import { IService } from "../interfaces/service.interface";
const fs = require('fs');
const edge = require('edge-js');


export class DllService implements IService {

    private repoFactory: RepositoryFactory;
    private dllRepository: IRepository<Dll>;
    private dllParamsRepository: IRepository<DllParam>;

    constructor() {
        this.repoFactory = new RepositoryFactory();
        this.dllRepository = this.repoFactory.createRepository<IRepository<Dll>>(DllsRepository<Dll>);
        this.dllParamsRepository = this.repoFactory.createRepository<IRepository<DllParam>>(DllParamsRepository<DllParam>);
    }

    async getAll(): Promise<Dll[]> {
        return await this.dllRepository.all();
    }

    async get(req: any): Promise<Dll> {
        const id = parseInt(req.params.id);
        const dll = await this.dllRepository.find(id);
        // we can figure out how to improve the performance here, creating a new common method or implement grapqhl for V2
        const params = (await this.dllParamsRepository.all()).filter( p => p.dll_id === id);
        dll.binary = '';
        dll.datetime =  null;
        dll.className = '';
        dll.nameSpace = '';
        dll.methodName = '';
        dll.params = params;
        return dll;
    }

    async create(req: any): Promise<IDatabaseResponse<number>> {
        const name = req.query.name;
        const nameSpace = req.query.nameSpace;
        const className = req.query.className;
        const methodName = req.query.methodName;
        const params = JSON.parse(req.headers["params"]) as DllParam[];
        const binary = req.body.toString('hex');

        const dll: IParam[] = [
            {
                field: "name",
                datatype: "string",
                value: name
            },
            {
                field: "binary",
                datatype: "string",
                value: binary
            },
            {
                field: "nameSpace",
                datatype: "string",
                value: nameSpace
            },
            {
                field: "className",
                datatype: "string",
                value: className
            },
            {
                field: "methodname",
                datatype: "string",
                value: methodName
            },
        ];

        const responseDll = await this.dllRepository.add(dll);
        if (responseDll.status == Status.Error)
            throw responseDll.error;

        params.forEach(async item => {
            const params = this.mapDllParamToIParam(item, responseDll.data as number)
            await this.dllParamsRepository.add(params);
        });

        return responseDll;
    }

    async execute(req: any): Promise<number> {
        const id = req.query.id as number;
        const params = req.body as DllParam[];

        const dll = await this.dllRepository.find(id);
        dll.params = [...params];

        const buffer = Buffer.from(dll.binary, 'hex');
        const filePath = `src/modules/dll/bin/${dll.name}.dll`;
        await this.writeFileAsync(filePath, buffer);

        // execute dll class method from .cs file
        return this.exec(dll, filePath);
    }

    private mapDllParamToIParam(dllParam: DllParam, id: number): IParam[] {
        const params: IParam[] = [];

        for (const key in dllParam) {
            if (dllParam.hasOwnProperty(key)) {
                const value = dllParam[key].toString();
                params.push({
                    field: key,
                    datatype: typeof dllParam[key],
                    value: key === 'dll_id' ? id : value
                });
            }
        }

        return params;
    }

    private async writeFileAsync(filePath: string, buffer: Buffer): Promise<void> {
        try {
            await fs.promises.writeFile(filePath, buffer);
            console.log('.cs file written successfully');
        } catch (err) {
            console.error(err);
        }
    }

    private async exec(dll: Dll, path: string): Promise<number> {
        const csAssemblyPath = path; // specify the path to the compiled .cs assembly

        // Load the compiled assembly in Node.js
        const csAssembly = edge.func({
            assemblyFile: csAssemblyPath,
            typeName: `${dll.nameSpace}.${dll.className}`,
            methodName: dll.methodName
        });

        // Define the input object with the parameters
        const input = this.convertDllParamArrayToObject(dll.params);

        // Invoke the method from the loaded assembly with the input object
        const csAssemblyAsync = async (input) => {
            return new Promise((resolve, reject) => {
                csAssembly(input, (error, result) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result);
                    }
                });
            });
        };

        return await csAssemblyAsync(input) as number;
    }

    private convertDllParamArrayToObject (dllParams: DllParam[]): any {
        // Sort the array by "order" property in ascending order
        dllParams.sort((a, b) => a.order - b.order);

        // Convert the array to an object containing only "name" and "value" properties
        const result = {};
        dllParams.forEach((dllParam) => {
            result[dllParam.name] = dllParam.value;
        });

        return result;
    };
}