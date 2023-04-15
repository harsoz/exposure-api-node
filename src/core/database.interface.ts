export interface IDatabaseConnection {
    // avoid connect && disconnect by now
    // connect(): Promise<void>;
    // disconnect(): Promise<void>;
    executeQuery<T>(config: IQueryConfig): Promise<IDatabaseResponse<T>>;
}

export interface IDatabaseConfig {
    hostname: string | undefined;
    user: string;
    password: string;
    database: string;
    path: string;
}

export interface IQueryConfig {

    query: string;
    type: QueryType
}

export interface IDatabaseResponse <T> {
    status: string;
    error: string | null;
    data: T | T[] | null;
}

export interface IParam {
    field: string;
    datatype: string;
    value: string;
}

export enum QueryType {
    FirstOrDefault = "FirstOrDefault",
    List = "List",
    Operation = "Operation",
}

export enum Status{
    Success = "success",
    Error = "error"
}


