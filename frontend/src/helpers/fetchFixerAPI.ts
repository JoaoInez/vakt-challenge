import { Method } from "types";

const baseUrl = "http://data.fixer.io/api";
const accessKey = "6a1dfd9acee29589ef688722cb17f95e";
const defaultOptions: RequestInit = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  body: undefined,
};

export const fetchFixerAPI = (
  url: RequestInfo,
  params?: string,
  options: RequestInit & Method = {} as RequestInit & Method
) =>
  fetch(
    `${baseUrl}${url}${
      params ? `?access_key=${accessKey}&${params}` : `?access_key=${accessKey}`
    }`,
    {
      ...defaultOptions,
      ...options,
    }
  );
