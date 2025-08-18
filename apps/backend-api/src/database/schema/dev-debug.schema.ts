import { pgTable, serial, text, timestamp, varchar } from 'drizzle-orm/pg-core';

export const devDebugTable = pgTable('dev_debug', {
    id: serial('id').primaryKey(),
    type: varchar('type', { length: 256 }).notNull(),
    message: text('message'),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
});

export type DevDebug = typeof devDebugTable.$inferSelect;
export type NewDevDebug = typeof devDebugTable.$inferInsert;