import { type NextFunction, type Request, type Response } from "express";
import { CustomError } from "../../customError/customError.js";

export const notFoundError = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const error = new CustomError(
    "Endpoint not found",
    404,
    "Endpoint not found"
  );

  next(error);
};
