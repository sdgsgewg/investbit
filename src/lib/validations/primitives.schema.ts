import z from "zod";

export const idSchema = z.string().uuid();

export const nullableIdSchema = idSchema.nullable().optional();

export const slugSchema = z
  .string()
  .min(1)
  .regex(/^[a-z0-9-]+$/);

export const urlSchema = z.url();

export const emailSchema = z.email();
