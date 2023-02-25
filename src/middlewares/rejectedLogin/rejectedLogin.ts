import { type NextFunction } from "express";
import { CustomError } from "../../customError/customError.js";

export const rejectedLogin = (
  reasonForRejection: string,
  next: NextFunction
) => {
  const invalidUsernamePassword = new CustomError(
    `Invalid ${reasonForRejection}.`,
    401,
    "The combination loginname and password is incorrect, please try again."
  );

  next(invalidUsernamePassword);
};
