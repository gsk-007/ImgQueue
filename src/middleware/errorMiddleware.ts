import { NextFunction, Request, Response } from "express";
import { CustomError } from "../errors/customError";

export const notFound = (req: Request, res: Response, next: NextFunction) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomError) {
    res.status(err.statusCode).send({ errors: err.serializeErrors() });
    return;
  }
  console.log(err);
  res.status(400).json({
    errors: [{ message: "Something went wrong!" }],
  });
};
