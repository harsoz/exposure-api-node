import sqlite3 from "sqlite3";
import { IDatabaseConfig, IDatabaseConnection, IDatabaseResponse, IQueryConfig, QueryType, Status } from "./database.interface";

export class SqlLite implements IDatabaseConnection {

    //private db: sqlite3.Database | null;
    private path: string;

    constructor(config: IDatabaseConfig) {
        this.path = config.path;
        //this.db = null;
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
            let db = new sqlite3.Database(this.path);
            const result: IDatabaseResponse<T> = {
                status: Status.Error,
                error: null,
                data: null
            };
            db?.get(query, function (err, row) {
                if (err) {
                    result.status = Status.Error;
                    result.error = err.message;
                    reject(result)
                } else {
                    result.status = Status.Success;
                    result.error = null;
                    result.data = row as T;
                    resolve(result); // Resolve the promise with the result
                }
            });
            db.close();
        });
    }

    private async array<T>(query: string): Promise<IDatabaseResponse<T>> {
        return new Promise((resolve, reject) => {
            let db = new sqlite3.Database(this.path);
            const result: IDatabaseResponse<T> = {
                status: Status.Error,
                error: null,
                data: null
            };
            db?.all(query, function (err, rows) {
                if (err) {
                    result.status = Status.Error;
                    result.error = err.message;
                    reject(result)
                } else {
                    const array: T[] = [];
                    rows.forEach(function (row) {
                        array.push(row as T)
                    });
                    result.status = Status.Success;
                    result.error = null;
                    result.data = array;
                    resolve(result); // Resolve the promise with the result
                }
            });
            db.close();
        });
    }

    private async operation<T>(query: string): Promise<IDatabaseResponse<T>> {
        return new Promise((resolve, reject) => {
            let db = new sqlite3.Database(this.path);
            const result: IDatabaseResponse<T> = {
                status: Status.Error,
                error: null,
                data: null
            };
            db?.run(query, function (err) {
                if (err) {
                    result.status = Status.Error;
                    result.error = err.message;
                    reject(result)
                } else {
                    result.status = Status.Success;
                    result.error = null;
                    result.data = this.lastID as T
                    resolve(result); // Resolve the promise with the result
                }
            });
            db.close();
        });
    }
}