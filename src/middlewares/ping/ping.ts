import { type NextFunction, type Request, type Response } from "express";

const ping = (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({ ping: "pong 🏓" });
};

export default ping;
