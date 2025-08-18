import { eq } from "drizzle-orm";
import { NodePgDatabase } from "drizzle-orm/node-postgres";

export abstract class RepositoryHelper {
    static createBaseOperations<T>(
        db: NodePgDatabase<any>,
        table: any,
        idColumn: any,
        EntityClass: new (data: any) => T
    ) {
        return {
            async findAll(): Promise<T[]> {
                const results = await db.select().from(table);
                return results.map(result => new EntityClass(result));
            },

            async findById(id: number): Promise<T | null> {
                const results = await db
                    .select()
                    .from(table)
                    .where(eq(idColumn, id));

                return results[0] ? new EntityClass(results[0]) : null;
            },

            async create(entityData: any): Promise<T> {
                const results = await db
                    .insert(table)
                    .values(entityData)
                    .returning();

                return new EntityClass(results[0]);
            },

            async update(id: number, entityData: any): Promise<T | null> {
                const updateData = { ...entityData, updatedAt: new Date() };

                const results = await db
                    .update(table)
                    .set(updateData)
                    .where(eq(idColumn, id))
                    .returning();

                return results[0] ? new EntityClass(results[0]) : null;
            },

            async delete(id: number): Promise<boolean> {
                const result = await db
                    .delete(table)
                    .where(eq(idColumn, id));

                return result.rowCount > 0;
            }
        };
    }
}