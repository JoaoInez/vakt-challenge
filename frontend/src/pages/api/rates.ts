import { NextApiRequest, NextApiResponse } from "next";
import { getLatestRatesFixerAPI } from "api";
import { RatesResponse } from "types";

export default async (
  req: NextApiRequest,
  res: NextApiResponse<RatesResponse>
) => {
  const { currencies } = req.query;

  if (!currencies) return res.status(400);
  const data = await getLatestRatesFixerAPI(currencies as string | string[]);
  res.status(200).json(data);
};
