import { loginSchema } from "@/lib/validations/auth/login.schema";
import z from "zod";

export type LoginInput = z.infer<typeof loginSchema>;
