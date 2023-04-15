export class RepositoryFactory {
    createRepository<T>(repositoryClass: { new(): T }): T {
        return new repositoryClass();
    }
}
