import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
  PORT: z.string().default("5000"),
  MONGO_URI: z.string().min(1),
  JWT_SECRET: z.string().min(20, "JWT_SECRET debe tener al menos 20 chars"),
  JWT_EXPIRES_IN: z.string().default("1d")
});

export const env = envSchema.parse(process.env);