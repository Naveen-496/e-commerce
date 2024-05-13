DO $$ BEGIN
 CREATE TYPE "public"."todo_status" AS ENUM('Done', 'Pending');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "todos" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"status" "todo_status" DEFAULT 'Pending',
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"created_by" integer NOT NULL,
	"assignee" integer
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "todos" ADD CONSTRAINT "todos_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "todos" ADD CONSTRAINT "todos_assignee_users_id_fk" FOREIGN KEY ("assignee") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
