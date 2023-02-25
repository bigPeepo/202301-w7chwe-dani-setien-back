import { type Request } from "express";

export interface UserCreationRequest extends Request {
  username: string;
  password: string;
  email: string;
  image: string;
}

export interface CustomLoginRequest extends Request {
  body: {
    username: string;
    password: string;
  };
}
