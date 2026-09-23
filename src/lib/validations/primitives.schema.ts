import z from "zod";

export const idSchema = z.string().uuid();

export const nullableIdSchema = idSchema.nullable().optional();

export const slugSchema = z
  .string()
  .min(1)
  .regex(/^[a-z0-9-]+$/);

export const urlSchema = z.url();

export const emailSchema = z.email("Please enter a valid email address.");

export const passwordSchema = z
  .string()
  .min(8, { message: "Password must be at least 8 characters long" })
  .max(20, { message: "Password cannot exceed 20 characters" })
  .refine((val) => /[A-Z]/.test(val), {
    message: "Password must contain at least one uppercase letter",
  })
  .refine((val) => /[a-z]/.test(val), {
    message: "Password must contain at least one lowercase letter",
  })
  .refine((val) => /[0-9]/.test(val), {
    message: "Password must contain at least one number",
  })
  .refine((val) => /[\!@#\$%\^&\*]/.test(val), {
    message: "Password must contain at least one special character",
  });
