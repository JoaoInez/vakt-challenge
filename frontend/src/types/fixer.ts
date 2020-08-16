export type SymbolsResponse = {
  success: boolean;
  symbols: object;
};

export type RatesResponse = {
  success: boolean;
  timestamp: number;
  base: string;
  date: string;
  rates: { GBP: number };
};
