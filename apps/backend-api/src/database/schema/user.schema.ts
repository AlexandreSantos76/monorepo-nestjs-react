import { pgTable, serial, varchar, timestamp, text, unique, boolean } from 'drizzle-orm/pg-core';
export const usersTable = pgTable("users", {
    userId: serial("user_id").primaryKey().notNull(),
    name: text("full_name").notNull(),
    email: varchar({ length: 256 }).notNull(),
    isActive: boolean("is_active").default(true),
    isEmailVerified: boolean("is_email_verified").default(false),
    googleId: varchar({ length: 256 }).unique(),
    password: varchar({ length: 256 }),
    createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
    updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow(),
}, (table) => [
    unique("users_email_unique").on(table.email),
]);

export type UserRow = typeof usersTable.$inferSelect;
export type NewUserRow = typeof usersTable.$inferInsert;
