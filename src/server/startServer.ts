import express from "express";
import { CustomError } from "../customError/customError.js";

const app = express();
app.disable("x-powered-by");

export const startServer = async (port: number) =>
  new Promise((resolve, reject) => {
    const server = app.listen(port, () => {
      resolve(server);
    });

    server.on("error", (error: CustomError) => {
      let errorMessage = "Error on starting the server.";

      if (error.code === "EADDRINUSE") {
        errorMessage += ` The port ${port} is already in use.`;
      }

      reject(new CustomError(errorMessage, 500, "Our server is not online."));
    });
  });

export default app;
