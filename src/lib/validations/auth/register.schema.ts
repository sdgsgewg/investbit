import z from "zod";
import { emailSchema, passwordSchema } from "../primitives.schema";

export const registerSchema = z
  .object({
    name: z
      .string()
      .min(1, "Name is required")
      .max(50, "Name must be at most 50 characters")
      .regex(/^[A-Za-z\s]+$/, "Name can only contain letters and spaces"),
    email: emailSchema,
    password: passwordSchema,
    password_confirmation: passwordSchema,
  })
  .refine(
    ({ password, password_confirmation }) => password === password_confirmation,
    {
      message: "Password must match the password confirmation",
      path: ["password_confirmation"],
    },
  );
