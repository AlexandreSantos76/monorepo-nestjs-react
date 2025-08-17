import { pgTable, serial, varchar, text, timestamp, unique } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const devDebug = pgTable("dev_debug", {
	id: serial().primaryKey().notNull(),
	type: varchar({ length: 256 }).notNull(),
	message: text(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow(),
});

export const messages = pgTable("messages", {
	messageId: serial("message_id").primaryKey().notNull(),
	messageName: text("message_name").notNull(),
	messageContent: text("message_content").default('),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow(),
});

export const users = pgTable("users", {
	userId: serial("user_id").primaryKey().notNull(),
	fullName: text("full_name"),
	email: varchar({ length: 256 }).notNull(),
	password: varchar({ length: 256 }).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow(),
}, (table) => [
	unique("users_email_unique").on(table.email),
]);
