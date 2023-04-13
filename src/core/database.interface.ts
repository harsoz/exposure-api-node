interface IDatabaseConnection {
    connect(): void;
    disconnect(): void;
    executeQuery<T>(config: IQueryConfig): Promise<IDatabaseResponse<T>>;
}

interface IDatabaseConfig {
    hostname: string;
    user: string;
    password: string;
    database: string;
    path: string;
}

interface IQueryConfig {

    query: string;
    type: QueryType
}

interface IDatabaseResponse <T> {
    status: string;
    error: string | null;
    data: T | T[] | null;
}

enum QueryType {
    FirstOrDefault = "FirstOrDefault",
    List = "List",
    Operation = "Operation",
}

enum Status{
    Success = "success",
    Error = "error"
}


