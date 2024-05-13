CREATE TABLE IF NOT EXISTS "credentials" (
	"id" serial PRIMARY KEY NOT NULL,
	"password" text NOT NULL,
	"user_id" integer NOT NULL,
	CONSTRAINT "credentials_user_id_unique" UNIQUE("user_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"username" text NOT NULL,
	"email" text,
	"bio" text
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "user_idx" ON "credentials" ("user_id");