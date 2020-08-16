import { Method } from "types";

const baseUrl = "http://localhost:3000/api";
const defaultOptions: RequestInit = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  body: undefined,
};

export const fetchNextAPI = (
  url: RequestInfo,
  options: RequestInit & Method = {} as RequestInit & Method
) => fetch(`${baseUrl}${url}`, { ...defaultOptions, ...options });
