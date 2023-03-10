import express from "express";
import morgan from "morgan";
import cors from "cors";
import usersRouter from "./routers/user/userRouters.js";
import { notFoundError } from "../middlewares/notFoundError/notFoundError.js";
import { generalError } from "../middlewares/generalError/generalError.js";
import ping from "../middlewares/ping/ping.js";

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

app.get("/", ping);

app.use("/", notFoundError);
app.use("/", generalError);
