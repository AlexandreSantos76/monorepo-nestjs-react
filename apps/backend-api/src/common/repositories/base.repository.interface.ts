export interface IBaseRepository<T> {
    findAll(): Promise<T[]>;
    findById(id: number): Promise<T | null>;
    create(entity: Omit<T, 'id' | 'createdAt' | 'updatedAt'>): Promise<T>;
    update(id: number, entity: Partial<T>): Promise<T | null>;
    delete(id: number): Promise<boolean>;
}

export interface IRepository<T> {
    findAll(): Promise<T[]>;
    findById(id: number): Promise<T | null>;
    create(data: any): Promise<T>;
    update(id: number, data: any): Promise<T | null>;
    delete(id: number): Promise<boolean>;
}