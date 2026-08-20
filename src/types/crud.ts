import { Dispatch, ReactNode, SetStateAction } from "react";
import { Option } from "./option";
import { InvalidateQueryFilters } from "@tanstack/react-query";
import { Entity } from "@/config/entities";
import { DataColumn, DataRow } from "./table";
import { SortOrder } from "./sort";

type FieldType = "text" | "select";

export type CrudFormField = {
  name: string;
  label: string;
  placeholder?: string;
  type: FieldType;
  options?: Option[];
  required?: boolean;
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

// Form

export interface CrudPageFormProps<TForm extends CrudForm> {
  formFields: CrudFormField[];

  form: TForm;

  setForm: Dispatch<SetStateAction<TForm>>;

  isEditing: boolean;

  isSubmitting: boolean;

  buttonText: string;

  resetForm: () => void;

  canSubmit: boolean;

  onSubmit: () => void;
}

// Mutation

export type CrudAction = "create" | "edit" | "update" | "delete";

export interface CrudMutationOptions<TVariables> {
  mutationFn: (variables: TVariables) => Promise<unknown>;

  invalidateQueries?: InvalidateQueryFilters[];

  allowRedirect?: boolean;
  redirectTo?: string;

  entityKey: Entity;
  action: CrudAction;

  getPayload?: (variables: TVariables) => unknown;

  onSuccess?: (data: unknown, variables: TVariables) => void;
}

// Pages

// Supporting Interface and Type

export interface CrudFormProps<T extends CrudForm> {
  formFields: CrudFormField[];

  form: T;
  setForm: Dispatch<SetStateAction<T>>;

  canSubmit: boolean;
  onSubmit: () => void;

  isEditing: boolean;
  isSubmitting: boolean;
  buttonText: string;

  resetForm: () => void;
}

export interface CrudActions<T extends DataRow> {
  onCreate?: () => void;
  onReorder?: () => void;

  onView?: (item: T) => void;
  onEdit: (item: T) => void;
  onDelete: (item: T) => void;
}

export interface CrudToolbarProps {
  searchValue?: string;
  searchPlaceholder?: string;
  onSearchChange?: (value: string) => void;

  onFilter?: () => void;
}

export interface CrudSortingProps {
  sortBy?: string;
  sortOrder?: SortOrder;

  onSort?: (column: string) => void;
}

export interface CrudPaginationProps {
  page: number;
  limit: number;

  totalPages: number;
  totalItems: number;

  loading?: boolean;

  onPageChange: (page: number) => void;
}

// Page Props

export type CrudFormTablePageProps<
  TData extends DataRow,
  TForm extends CrudForm,
> = {
  title: string;

  headerContent?: ReactNode;

  loading?: boolean;

  data: TData[];

  columns: DataColumn<TData>[];

  actions: CrudActions<TData>;

  form: CrudFormProps<TForm>;

  toolbar?: CrudToolbarProps;

  sorting?: CrudSortingProps;

  pagination?: CrudPaginationProps;
};
