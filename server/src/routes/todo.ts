import { validator } from "hono/validator";
import { Hono } from "hono";
import type { Todos } from "../db";
import { db } from "../db/drizzle";
import { todosTable } from "../db/schema";
import { and, eq } from "drizzle-orm";
import { getCurrentUser } from "../../middleware";

export const route = new Hono();

// GET all todos
route.get("/", getCurrentUser, async (c) => {
  const user = c.var.user;
  const todos = await db
    .select()
    .from(todosTable)
    .where(eq(todosTable.createdBy, user.id));
  return c.json({ result: todos });
});

// GET a specific todo by id
route.get("/:id", async (c) => {
  const id = parseInt(c.req.param("id"));
  const todo = await db.select().from(todosTable).where(eq(todosTable.id, id));
  if (!todo) {
    return c.json({ error: "Todo not found" }, 404);
  }
  return c.json({ result: todo });
});

// POST a new todo
route.post("/", getCurrentUser, async (c) => {
  const user = c.var.user;
  const { name, status, assignee } = await c.req.json();
  const newTodo = await db
    .insert(todosTable)
    .values({
      name,
      status,
      assignee,
      createdBy: user.id,
    })
    .returning()
    .then((res) => res[0]);
  return c.json({ result: newTodo }, 201);
});

// PUT (update) an existing todo
route.put("/:id", getCurrentUser, async (c) => {
  const id = parseInt(c.req.param("id"));
  let todo = await db
    .select()
    .from(todosTable)
    .where(eq(todosTable.id, id))
    .then((res) => res[0]);

  if (!todo) {
    return c.notFound();
  }
  const { name, status, assignee } = await c.req.json();
  todo = await db
    .update(todosTable)
    .set({
      name,
      status,
      assignee,
      updatedAt: new Date(),
    })
    .returning()
    .then((res) => res[0]);
  return c.json({ result: todo });
});

// DELETE a todo by id
route.delete("/:id", getCurrentUser, async (c) => {
  const user = c.var.user;
  const id = parseInt(c.req.param("id"));
  const todo = await db
    .delete(todosTable)
    .where(and(eq(todosTable.id, id), eq(todosTable.createdBy, user.id!)))
    .returning()
    .then((res) => res[0]);
  if (!todo) {
    return c.json({ error: "Todo not found" }, 404);
  }
  return c.json({ result: todo }, 204);
});

route.post("/upload", async (c) => {
  const formData = await c.req.formData();
  const file: File = formData.get("file") as File;
  console.log(file.name);
  Bun.write("uploads/" + file.name, await file.arrayBuffer());
  return c.json({ result: file.name });
});
