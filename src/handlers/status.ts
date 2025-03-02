import { Request, Response } from "express";

export const checkStatus = async (req: Request, res: Response) => {
  res.send("STAUS HANDLER");
};
