import { decode, sign } from "hono/jwt";
import { createMiddleware } from "hono/factory";
import { Env } from "./src/routes/users";
import { eq } from "drizzle-orm";
import { db } from "./src/db/drizzle";
import { usersTable } from "./src/db/schema";

export const getCurrentUser = createMiddleware<Env>(async (c, next) => {
  console.log(`[${c.req.method}] ${c.req.url}`);
  const token = c.req.header("accessToken");
  if (!token) {
    return c.json({
      message: "Token must be present in the header",
    }, 401);
  }
  try {
    const { header, payload } = decode(token);
    console.log("Decoded Header:", header);
    console.log("Decoded Payload:", payload);
    const sub = payload.sub;
    const user = (
      await db.select().from(usersTable).where(eq(usersTable.email, sub))
    ).at(0);
    c.set("user", user!);
    await next();
  } catch (error: any) {
    return c.json({ message: error.message }, 401);
  }
});
