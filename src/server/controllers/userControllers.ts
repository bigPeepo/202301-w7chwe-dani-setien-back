import "../../loadEnvironments.js";
import bcrypt from "bcryptjs";
import { type NextFunction, type Request, type Response } from "express";
import { type UserCreationRequest as UserCreationRequestBody } from "../../types.js";
import { CustomError } from "../../customError/customError.js";
import { User } from "../../database/models/UserSchema.js";

export const signupUser = async (
  req: Request<
    Record<string, unknown>,
    Record<string, unknown>,
    UserCreationRequestBody
  >,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, password, email } = req.body;
    const imageName = req.file?.originalname;

    const saltLength = 10;
    const hashedPassword = await bcrypt.hash(password, saltLength);

    await User.create({
      username,
      password: hashedPassword,
      email,
      image: imageName,
    });

    res.status(201).json({
      username,
    });
  } catch (error) {
    const createUserError = new CustomError(
      error.message as string,
      500,
      "Error creting the user"
    );
    next(createUserError);
  }
};
