import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

config({ path: ".env" });

// export default defineConfig({
//   driver: "d1",
//   schema: "./src/db/schema.ts",
//   dbCredentials: {
//     connectionString: process.env.DB_URL!,
//   },
//   out: "./drizzle",
//   verbose: true,
//   strict: true,
// });

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/db/schema.ts",
  dbCredentials: {
    url: process.env.DB_URL!,
  },
  verbose: true,
  strict: true,
  out: "./drizzle",
  migrations: {
    table: "migrations",
    schema: "public",
  },
});
