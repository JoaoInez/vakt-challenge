import { Method } from "types";

const baseUrl = "http://localhost:8080";
const defaultOptions: RequestInit = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  body: undefined,
  credentials: "include",
};

export const fetchServerAPI = (
  url: RequestInfo,
  options: RequestInit & Method = {} as RequestInit & Method
) => fetch(`${baseUrl}${url}`, { ...defaultOptions, ...options });
