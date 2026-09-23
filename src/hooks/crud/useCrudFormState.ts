"use client";

import { useSelector, type AnyFormApi } from "@tanstack/react-form";

interface UseCrudFormStateOptions {
  form: AnyFormApi;
}

export function useCrudFormState({ form }: UseCrudFormStateOptions) {
  const isDirty = useSelector(form.store, (state) => state.isDirty);

  const formCanSubmit = useSelector(form.store, (state) => state.canSubmit);

  const canSubmit = formCanSubmit && isDirty;

  return {
    isDirty,
    canSubmit,
  };
}
