import { IDatabaseResponse, IParam } from "./database.interface";

export interface IRepository<T> {
    find(id:number): Promise<T>;
    all(): Promise<T[]>;
    add(params:IParam[]): Promise<IDatabaseResponse<number>>;
    delete(id:number): Promise<IDatabaseResponse<T>>;
    update(params:IParam[], id:number): Promise<IDatabaseResponse<T>>;
    query(query: string): Promise<IDatabaseResponse<T>>;
}