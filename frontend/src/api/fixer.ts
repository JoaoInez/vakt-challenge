import { fetchFixerAPI, handleResJSON, identity } from "helpers";
import { SymbolsResponse, RatesResponse } from "types";

export const getSymbolsFixerAPI = (): Promise<SymbolsResponse> =>
  fetchFixerAPI("/symbols").then(handleResJSON).catch(identity);

export const getLatestRatesFixerAPI = (
  currencies: string | string[]
): Promise<RatesResponse> =>
  fetchFixerAPI(
    "/latest",
    `symbols=GBP,${
      typeof currencies === "string" ? currencies : currencies.join(",")
    }`
  )
    .then(handleResJSON)
    .catch(identity);
