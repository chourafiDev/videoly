import type { NextApiRequest, NextApiResponse } from "next";

export default (func: any) =>
  (req: NextApiRequest, res: NextApiResponse, next: any) =>
    Promise.resolve(func(req, res, next)).catch(next);
