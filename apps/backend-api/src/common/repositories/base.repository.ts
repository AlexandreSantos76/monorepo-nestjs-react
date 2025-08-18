// src/common/repositories/base.repository.ts
import { Injectable, Inject } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { eq } from 'drizzle-orm';
import { DATABASE_CONNECTION } from '../../database/database.module';
import * as schema from '../../database/schema';

@Injectable()
export abstract class BaseRepository<T> {
    constructor(
        @Inject(DATABASE_CONNECTION)
        protected readonly db: NodePgDatabase<typeof schema>,
    ) { }

    // Métodos abstratos
    abstract getTable(): any;
    abstract getIdColumn(): any;

    // Agora o createEntity recebe o dado bruto e faz o mapeamento
    protected abstract createEntity(data: any): T;

    // Método auxiliar para fazer a conversão da data
    protected mapDataToEntity(data: any, EntityClass: new (partial: any) => T): T {
        const mappedData = {
            ...data,
            createdAt: data.createdAt ? new Date(data.createdAt) : undefined,
            updatedAt: data.updatedAt ? new Date(data.updatedAt) : undefined,
        };
        return new EntityClass(mappedData);
    }

    // Métodos que herdam
    async findAll(): Promise<T[]> {
        const results = await this.db.select().from(this.getTable());
        return results.map(result => this.createEntity(result));
    }

    async findById(id: number): Promise<T | null> {
        const results = await this.db
            .select()
            .from(this.getTable())
            .where(eq(this.getIdColumn(), id));

        return results[0] ? this.createEntity(results[0]) : null;
    }

    async create(entityData: any): Promise<T> {
        const results = await this.db
            .insert(this.getTable())
            .values(entityData)
            .returning();

        return this.createEntity(results[0]);
    }

    async update(id: number, entityData: any): Promise<T | null> {
        const updateData = { ...entityData };
        try {
            updateData.updatedAt = new Date();
        } catch { }

        const results = await this.db
            .update(this.getTable())
            .set(updateData)
            .where(eq(this.getIdColumn(), id))
            .returning();

        return results[0] ? this.createEntity(results[0]) : null;
    }

    async delete(id: number): Promise<boolean> {
        const result = await this.db
            .delete(this.getTable())
            .where(eq(this.getIdColumn(), id));

        return result.rowCount > 0;
    }

    protected async findWhere(condition: any): Promise<T[]> {
        const results = await this.db
            .select()
            .from(this.getTable())
            .where(condition);

        return results.map(result => this.createEntity(result));
    }

    protected async findOneWhere(condition: any): Promise<T | null> {
        const results = await this.db
            .select()
            .from(this.getTable())
            .where(condition)
            .limit(1);

        return results[0] ? this.createEntity(results[0]) : null;
    }
}