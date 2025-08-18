export class BaseEntity {
    id: number;
    createdAt: Date;
    updatedAt: Date;

    constructor(partial: Partial<BaseEntity>) {
        // Conversão dos campos de data
        if (partial.createdAt && typeof partial.createdAt === 'string') {
            partial.createdAt = new Date(partial.createdAt);
        }
        if (partial.updatedAt && typeof partial.updatedAt === 'string') {
            partial.updatedAt = new Date(partial.updatedAt);
        }

        Object.assign(this, partial);
    }
}