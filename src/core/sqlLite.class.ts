import sqlite3 from "sqlite3";

class SqlLite implements IDatabaseConnection {

    private db: sqlite3.Database | null;
    private path: string;

    constructor(config: IDatabaseConfig) {
        this.path = config.path;
        this.db = null;
    }

    connect(): void {
        this.db = new sqlite3.Database(this.path);
    }

    disconnect(): void {
        this.db?.close((err) => {
            if (err) console.log(err);
        });
    }

    async executeQuery<T>(config: IQueryConfig): Promise<IDatabaseResponse<T>> {
        let response: IDatabaseResponse<T> = {
            status: Status.Success,
            error: null,
            data: null,
        };
        switch (config.type) {
            case QueryType.FirstOrDefault:
                response = await this.firstOrDefault(config.query);
                break;
            case QueryType.List:
                response = await this.array(config.query);
                break;
            default:
                response = await this.operation(config.query);
                break;
        }

        return response;
    }

    private async firstOrDefault<T>(query: string): Promise<IDatabaseResponse<T>> {
        return new Promise((resolve, reject) => {
            this.db?.get(query, function (err, row) {
                if (err) {
                    const result: IDatabaseResponse<T> = {
                        status: Status.Error,
                        error: err.message,
                        data: null
                    };
                    reject(result); // Reject the promise if there's an error
                } else {
                    const result: IDatabaseResponse<T> = {
                        status: Status.Success,
                        error: null,
                        data: row as T
                    };
                    resolve(result); // Resolve the promise with the result
                }
            });
        });
    }

    private async array<T>(query: string): Promise<IDatabaseResponse<T>> {
        return new Promise((resolve, reject) => {
            this.db?.all(query, function (err, rows) {
                if (err) {
                    const result: IDatabaseResponse<T> = {
                        status: Status.Error,
                        error: err.message,
                        data: null
                    };
                    reject(result); // Reject the promise if there's an error
                } else {
                    const array: T[] = [];
                    rows.forEach(function (row) {
                        array.push(row as T)
                    });
                    const result: IDatabaseResponse<T> = {
                        status: Status.Success,
                        error: null,
                        data: array
                    };
                    resolve(result);
                }
            });
        });
    }

    private async operation<T>(query: string): Promise<IDatabaseResponse<T>> {
        return new Promise((resolve, reject) => {
            this.db?.run(query, function (err) {
                if (err) {
                    const result: IDatabaseResponse<T> = {
                        status: Status.Error,
                        error: err.message,
                        data: null
                    };
                    reject(result); // Reject the promise if there's an error
                } else {
                    const result: IDatabaseResponse<T> = {
                        status: Status.Success,
                        error: 'Data has been inserted successfully',
                        data: null
                    };
                    resolve(result); // Resolve the promise with the result
                }
            });
        });
    }
}