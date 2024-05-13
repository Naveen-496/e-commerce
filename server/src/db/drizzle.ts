import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { config } from "dotenv";
config({ path: ".env" });
console.log(process.env.DB_URL);
export const sql = neon(process.env.DB_URL!);
export const db = drizzle(sql);
