"use client";

import { registerSchema } from "@/lib/validations/auth/register.schema";
import { RegisterInput } from "@/types/auth/register";
import { useForm } from "@tanstack/react-form";

interface UseRegisterFormOptions {
  onSubmit: (payload: RegisterInput) => void | Promise<void>;
}

const defaultValues: RegisterInput = {
  name: "",
  email: "",
  password: "",
  password_confirmation: "",
};

export function useRegisterForm({ onSubmit }: UseRegisterFormOptions) {
  const form = useForm({
    defaultValues,

    validators: {
      onChange: registerSchema,
      onSubmit: registerSchema,
    },

    onSubmit: async ({ value }) => {
      await onSubmit(value);
    },
  });

  return form;
}
