import axios from "axios";

export function hasDuplicateError(error: unknown) {
  return (
    axios.isAxiosError<{ error?: string }>(error) &&
    error.response?.data?.error?.includes("exists")
  );
}

export function getApiErrorMessage(error: unknown) {
  if (axios.isAxiosError<{ error?: string }>(error)) {
    return error.response?.data?.error;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return undefined;
}
