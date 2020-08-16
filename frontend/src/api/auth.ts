import {
  fetchServerAPI,
  handleResJSON,
  identity,
  handleResStatus,
} from "helpers";
import { SignUpResponse, LoginResponse, LogoutResponse } from "types";

export const signUpAPI = (
  username: string,
  password: string
): Promise<SignUpResponse> =>
  fetchServerAPI("/signup", {
    method: "POST",
    body: JSON.stringify({
      username,
      password,
    }),
  })
    .then(handleResJSON)
    .catch(identity);

export const loginAPI = (
  username: string,
  password: string
): Promise<LoginResponse> =>
  fetchServerAPI("/login", {
    method: "POST",
    body: JSON.stringify({
      username,
      password,
    }),
  })
    .then(handleResJSON)
    .catch(identity);

export const logoutAPI = (): Promise<LogoutResponse> =>
  fetchServerAPI("/logout").then(handleResStatus).catch(identity);
