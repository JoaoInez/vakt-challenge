export const convertToGBP = (
  price: number,
  currency: string,
  rates: { GBP: number }
) => +((price / rates[currency]) * rates.GBP).toFixed(2);
