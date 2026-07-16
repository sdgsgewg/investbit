import { Dispatch, ReactNode, SetStateAction } from "react";

type FieldType = "text" | "select";

export type CrudFormField = {
  name: string;
  label: string;
  placeholder?: string;
  type: FieldType;
  options?: { id: string; name: string }[];
};

export type CrudColumn = {
  key: string; // support nested: "category.name"
  label: string;
};

export type CrudRow = {
  id: string;
};

export type CrudForm = {
  [key: string]: unknown;
};

export type CrudPageProps<TData extends CrudRow, TForm extends CrudForm> = {
  title: string;
  formFields: CrudFormField[];
  columns: CrudColumn[];
  data: TData[];
  form: TForm;
  setForm: Dispatch<SetStateAction<TForm>>;
  canSubmit: () => boolean;
  onSubmit: () => void;
  onView?: (item: TData) => void;
  onEdit: (item: TData) => void;
  onDelete: (item: TData) => void;
  isEditing: boolean;
  isSubmitting: boolean;
  buttonText: string;
  resetForm: () => void;
  loading?: boolean;
  headerContent?: ReactNode;
};

export type CrudAction = "create" | "update" | "delete";

export interface CrudMutationOptions<TVariables> {
  mutationFn: (variables: TVariables) => Promise<unknown>;

  queryKey: readonly unknown[];

  entityKey: string;

  successKey: string;

  redirectTo: string;
}
