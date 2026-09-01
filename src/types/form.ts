import z from "zod";

export type FormMode = "create" | "edit";

export type FormSize = "small" | "medium" | "large";

export type FormErrors<T extends string = string> = Partial<Record<T, string>>;

export type EntityFormOptions<
  TForm extends Record<string, unknown>,
  TField extends keyof TForm & string,
> = {
  initialValue: TForm;

  schema: z.ZodType<TForm>;

  dirtyFields: readonly TField[];

  requiredFields: readonly TField[];

  buildPayload: (form: TForm) => FormData;
};

export type FormState<T> = T & {
  imageFile: File | null;
  previewUrl: string | null;
};
