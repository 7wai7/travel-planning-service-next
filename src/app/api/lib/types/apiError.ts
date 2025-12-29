export type ApiError = {
  message: string;
  status: number;
  fields?: Record<string, string>;
};
