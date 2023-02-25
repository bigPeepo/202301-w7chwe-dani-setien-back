import express from "express";
import morgan from "morgan";
import cors from "cors";
import usersRouter from "./routers/user/userRouters.js";
import {
  generalError,
  notFoundError,
} from "../middlewares/errorMiddlewares.js";

export const app = express();
app.disable("x-powered-by");

const corsOptions = {
  origin: [
    "http://localhost:4000",
    "http://localhost:4001",
    "https://two02301-w7chwe-dani-setien-back-prod.onrender.com/",
  ],
};

app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(express.json());

app.use("/user", usersRouter);

app.use("/", notFoundError);
app.use("/", generalError);
