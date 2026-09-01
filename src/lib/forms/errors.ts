import axios from "axios";
import { ZodError } from "zod";
import { FormErrors } from "@/types/form";
import { ApiErrorResponse } from "@/types/api";

export function getZodFormErrors<T extends string>(
  error: ZodError,
): FormErrors<T> {
  const errors: FormErrors<T> = {};

  for (const issue of error.issues) {
    const path = issue.path.join(".");

    if (!path) {
      continue;
    }

    const key = path as T;

    if (!errors[key]) {
      errors[key] = issue.message;
    }
  }

  return errors;
}

export function getApiFormErrors<T extends string>(
  error: unknown,
): FormErrors<T> | null {
  if (!axios.isAxiosError<ApiErrorResponse>(error)) {
    return null;
  }

  const fields = error.response?.data?.fields;

  if (!fields || typeof fields !== "object") {
    return null;
  }

  return fields as FormErrors<T>;
}
