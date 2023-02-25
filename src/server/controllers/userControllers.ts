import "../../loadEnvironments.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { type NextFunction, type Request, type Response } from "express";
import {
  type CustomLoginRequest,
  type UserCreationRequest as UserCreationRequestBody,
} from "../../types.js";
import { CustomError } from "../../customError/customError.js";
import { User } from "../../database/models/UserSchema.js";
import { rejectedLogin } from "../../middlewares/rejectedLogin/rejectedLogin.js";

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
      "Error creating the user"
    );
    next(createUserError);
  }
};

export const loginUser = async (
  req: CustomLoginRequest,
  res: Response,
  next: NextFunction
) => {
  const { password, username } = req.body;

  const user = await User.findOne({ username });

  if (!user) {
    const reasonForRejection = "username";
    rejectedLogin(reasonForRejection, next);

    return;
  }

  const loginSuccess = await bcrypt.compare(password, user.password);

  if (!loginSuccess) {
    const reasonForRejection = "password";
    rejectedLogin(reasonForRejection, next);

    return;
  }

  const jwtPayload = {
    sub: user._id,
    username,
  };

  const token = jwt.sign(jwtPayload, process.env.JWT_SECRET!, {
    expiresIn: "2d",
  });

  res.status(200).json({ token });
};
