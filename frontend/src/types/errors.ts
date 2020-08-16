export type ErrorsT =
  | "USER_ALREADY_EXISTS"
  | "INTERNAL_SERVER_ERROR"
  | "PASSWORDS_DONT_MATCH"
  | "INVALID_CREDENTIALS";

export type ErrorMessageT = {
  error: ErrorsT;
  message: string;
} | null;
