import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const messagesTable = pgTable('messages', {
    message_id: serial('message_id').primaryKey(),
    messageName: text('message_name').notNull(),
    messageContent: text('message_content').default(''),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
});

export type Message = typeof messagesTable.$inferSelect;
export type NewMessage = typeof messagesTable.$inferInsert;