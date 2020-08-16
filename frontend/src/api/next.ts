import { handleResJSON, identity, fetchNextAPI } from "helpers";
import { SymbolsResponse, RatesResponse } from "types";

export const getSymbolsNextAPI = (): Promise<SymbolsResponse> =>
  fetchNextAPI("/symbols").then(handleResJSON).catch(identity);

export const getLatestRatesNextAPI = (
  currencies: string | string[]
): Promise<RatesResponse> =>
  fetchNextAPI(`/rates?currencies=${currencies}`)
    .then(handleResJSON)
    .catch(identity);
