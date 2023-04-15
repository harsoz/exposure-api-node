import { IDatabaseConfig, IDatabaseResponse, IParam, IQueryConfig, QueryType, Status } from "../../core/database.interface";
import { IRepository } from "../../core/repository.interface";
import { SqlLite } from "../../core/sqllite";
import { generateInsertStatement, generateUpdateStatement } from "../utils";

export class DllParamsRepository<T> implements IRepository<T> {

  private db: SqlLite;
  private readonly tableName: string;

  constructor() {
    const dbConfig: IDatabaseConfig = {
      path: "src/database/db.sqlite",
      database: "",
      hostname: "",
      password: "",
      user: ""
    }
    this.db = new SqlLite(dbConfig);
    this.tableName = "tblDllParams";
  }

  async find<T>(id: number): Promise<T> {
    const queryConfig: IQueryConfig = {
      type: QueryType.FirstOrDefault,
      query: `select * from ${this.tableName} where id=${id}`
    }
    const response = await this.db.executeQuery<T>(queryConfig);
    if (response.status == Status.Error) {
      console.log(response.error);
    }
    return response.data as T;
  }

  async all(): Promise<T[]> {
    const queryConfig: IQueryConfig = {
      type: QueryType.List,
      query: `select * from ${this.tableName}`
    }
    const response = await this.db.executeQuery<T>(queryConfig);
    if (response.status == Status.Error) {
      console.log(response.error);
    }
    return response.data as T[];
  }

  async add<T>(params: IParam[]): Promise<IDatabaseResponse<T>> {
    const queryConfig: IQueryConfig = {
      type: QueryType.Operation,
      query: generateInsertStatement(params, this.tableName)
    }
    const response = await this.db.executeQuery<T>(queryConfig);
    if (response.status == Status.Error) {
      console.log(response.error);
    }
    return response;
  }

  async delete(id: number): Promise<IDatabaseResponse<T>> {
    const queryConfig: IQueryConfig = {
      type: QueryType.Operation,
      query: `delete from ${this.tableName} where id=${id}`
    }
    const response = await this.db.executeQuery<T>(queryConfig);
    if (response.status == Status.Error) {
      console.log(response.error);
    }
    return response;
  }

  async update(params: IParam[], id: number): Promise<IDatabaseResponse<T>> {
    const queryConfig: IQueryConfig = {
      type: QueryType.Operation,
      query: generateUpdateStatement(params, id, this.tableName)
    }
    const response = await this.db.executeQuery<T>(queryConfig);
    if (response.status == Status.Error) {
      console.log(response.error);
    }
    return response;
  }

  async query(query: string): Promise<IDatabaseResponse<T>> {
    const queryConfig: IQueryConfig = {
      type: QueryType.Operation,
      query: query
    }
    const response = await this.db.executeQuery<T>(queryConfig);
    if (response.status == Status.Error) {
      console.log(response.error);
    }
    return response;
  }

}