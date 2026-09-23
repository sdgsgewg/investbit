"use client";

import { useForm } from "@tanstack/react-form";

import { loginSchema } from "@/lib/validations/auth/login.schema";
import { LoginInput } from "@/types/auth/login";

interface UseLoginFormOptions {
  onSubmit: (payload: LoginInput) => void | Promise<void>;
}

const defaultValues: LoginInput = {
  email: "",
  password: "",
};

export function useLoginForm({ onSubmit }: UseLoginFormOptions) {
  const form = useForm({
    defaultValues,

    validators: {
      onChange: loginSchema,
      onSubmit: loginSchema,
    },

    onSubmit: async ({ value }) => {
      await onSubmit(value);
    },
  });

  return form;
}