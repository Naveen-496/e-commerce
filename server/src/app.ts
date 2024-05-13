import { Hono } from "hono";
import { sign } from "hono/jwt";

import { logger } from "hono/logger";
import { route as UserRoute } from "./routes/users";
import { route as TodoRoute } from "./routes/todo";

const app = new Hono();
app.basePath("/api").route("/todos", TodoRoute);
app.basePath("/api").route("/users", UserRoute);

app.use(logger());

// app.use(async (_, next) => {
//   console.log("middleware 1 start");
//   await next();
//   console.log("middleware 1 end");
// });
// app.use(async (_, next) => {
//   console.log("middleware 2 start");
//   await next();
//   console.log("middleware 2 end");
// });
// app.use(async (_, next) => {
//   console.log("middleware 3 start");
//   await next();
//   console.log("middleware 3 end");
// });

// const token = "honoiscool";



export default app;
