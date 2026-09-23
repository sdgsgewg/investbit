import z from "zod";
import { emailSchema, passwordSchema } from "../primitives.schema";

export const registerSchema = z
  .object({
    email: emailSchema,
    password: passwordSchema,
    password_confirmation: passwordSchema,
  })
  .refine(
    ({ password, password_confirmation }) => password !== password_confirmation,
    {
      message: "Password must match the password confirmation",
      path: ["password"],
    },
  );
