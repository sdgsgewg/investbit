export interface ApiResponse<T> {
  // success: boolean;
  success: true;
  data: T;
}

export type ApiFieldErrors = Record<string, string>;

export interface ApiErrorResponse {
  success: false;
  error: string;
  fields?: ApiFieldErrors;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
