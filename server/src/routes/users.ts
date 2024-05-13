import { Hono } from "hono";
import { decode, sign } from "hono/jwt";
import { createMiddleware } from "hono/factory";
import { password as encoder, SHA256 } from "bun";
import { db } from "../db/drizzle";
import { credentialsTable, usersTable } from "../db/schema";
import { eq } from "drizzle-orm";
import { getCurrentUser } from "../../middleware";

export type Env = {
  Variables: {
    user: UserType;
  };
};

type UserType = {
  id: number;
  username: string;
  email: string | null;
  role: string;
};

export const route = new Hono();
const secret = "mySecretKey";

const token = "honoiscool";
route.get("/api/page", (c) => {
  return c.json({ message: "Read posts" });
});

route.post("/api/page", getCurrentUser, (c) => {
  const user = c.var.user;

  return c.json({ message: "Created post for " + user.username }, 201);
});

route.get("/me", getCurrentUser, async (c) => {
  const userPayload = c.var.user;

  const user = (
    await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, userPayload.email!))
  ).at(0);
  return c.json({ result: user });
});

route.post("/login", async (c) => {
  const { email, password } = await c.req.json();

  const user = (
    await db.select().from(usersTable).where(eq(usersTable.email, email))
  ).at(0);
  if (!user) {
    return c.json({ message: "User not found " + email }, 404);
  }

  const userPassword = (
    await db
      .select()
      .from(credentialsTable)
      .where(eq(credentialsTable.userId, user.id))
  )[0].password;
  if (!encoder.verifySync(password, userPassword)) {
    return c.json({ status: 401, message: "Incorrect password" });
  }

  const payload = {
    sub: email,
    role: user.role,
    username: user.username,
    id: user.id,
    exp: Math.floor(Date.now() / 1000) + 60 * 5, // Token expires in 5 minutes
  };

  const token = await sign(payload, secret);
  return c.json({ token });
});

route.post("/register", async (c) => {
  const { username, role, bio, email, password } = await c.req.json();
  const user = (
    await db
      .insert(usersTable)
      .values({
        username,
        email,
        role,
        bio,
      })
      .returning()
  ).at(0);

  await db.insert(credentialsTable).values({
    password: encoder.hashSync(password, { algorithm: "bcrypt" }),
    userId: user?.id!,
  });

  return c.json({ result: user }, 201);
});

route.post("/:followerId/follow", async (c) => {
  const followerId = c.req.param("followerId");
});

route.post("/:followerId/unfollow", async (c) => {
  const followerId = c.req.param("followerId");
});

route.delete("/all", async (c) => {
  await db.delete(credentialsTable);
  await db.delete(usersTable);
  return c.json({ message: "All Records deleted" });
});
