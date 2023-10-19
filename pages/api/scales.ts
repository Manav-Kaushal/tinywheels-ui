// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { ModelScales } from "@utils/enums/ModelScales";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  scales: ModelScales[];
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({ scales: Object.values(ModelScales) });
}
