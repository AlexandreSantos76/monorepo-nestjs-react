ALTER TABLE "users" ADD COLUMN "googleId" varchar(256);--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_googleId_unique" UNIQUE("googleId");