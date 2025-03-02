import { Request, Response } from "express";

export const upload = async (req: Request, res: Response) => {
  res.send("UPLOAD HANDLER");
};
