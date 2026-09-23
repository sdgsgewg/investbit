import { registerSchema } from "@/lib/validations/auth/register.schema";
import z from "zod";

export type RegisterInput = z.infer<typeof registerSchema>;
