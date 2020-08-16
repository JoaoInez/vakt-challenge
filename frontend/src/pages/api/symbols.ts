import { NextApiRequest, NextApiResponse } from "next";
import { getSymbolsFixerAPI } from "api";
import { SymbolsResponse } from "types";

export default async (
  req: NextApiRequest,
  res: NextApiResponse<SymbolsResponse>
) => {
  const data = await getSymbolsFixerAPI();

  res.status(200).json(data);
};
