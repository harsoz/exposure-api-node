interface IRepository<T> {
    find(query:string): T;
    add(query:string): IDatabaseResponse<T>;
    all(query:string): T[];
    delete(query:string): IDatabaseResponse<T>;
    update(query:string): IDatabaseResponse<T>;
}