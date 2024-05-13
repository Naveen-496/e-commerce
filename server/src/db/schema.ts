import {
  pgTable,
  text,
  primaryKey,
  index,
  uniqueIndex,
  serial,
  integer,
  pgEnum,
  timestamp,
} from "drizzle-orm/pg-core";

export const accountsTable = pgTable(
  "accounts",
  {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    userId: text("user_id").notNull(),
  },
  (table) => {
    return {
      nameIdx: index("name_idx").on(table.name),
    };
  }
);

export const usersTable = pgTable(
  "users",
  {
    id: serial("id").primaryKey(),
    username: text("username").notNull(),
    email: text("email").unique(),
    bio: text("bio"),
    role: text("role").notNull(),
  },

  (table) => {
    return {
      emailIdx: index("email_idx").on(table.email),
    };
  }
);

export const credentialsTable = pgTable(
  "credentials",
  {
    id: serial("id").primaryKey(),
    password: text("password").notNull(),
    userId: integer("user_id").unique().notNull(),
  },
  (table) => {
    return {
      userIndex: uniqueIndex("user_idx").on(table.userId),
    };
  }
);

export const TodoStatus = pgEnum("todo_status", ["Done", "Pending"]);

export const todosTable = pgTable("todos", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  status: TodoStatus("status").default("Pending"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
  createdBy: integer("created_by")
    .notNull()
    .references(() => usersTable.id),
  assignee: integer("assignee").references(() => usersTable.id),
});

export const postsTable = pgTable("posts", {
  id: serial("id").primaryKey(),
  title: text("title"),
  body: text("body"),
  imageUrl: text("image_url"),
  userId: integer("user_id").references(() => usersTable.id),
});

export const postLikesTable = pgTable("post_likes", {
  postId: integer("post_id").references(() => postsTable.id),
  userId: integer("user_id").references(() => usersTable.id),
});

export const savedPostsTable = pgTable("saved_posts", {
  userId: integer("user_id").references(() => usersTable.id),
  postId: integer("post_id").references(() => postsTable.id),
});

export const commentsTable = pgTable("comments", {
  id: serial("id").primaryKey(),
  postId: integer("post_id").references(() => postsTable.id),
  
})

export type Todos = typeof todosTable;
