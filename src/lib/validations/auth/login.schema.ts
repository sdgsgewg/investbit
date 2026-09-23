import z from "zod";
import { emailSchema, passwordSchema } from "../primitives.schema";

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});
