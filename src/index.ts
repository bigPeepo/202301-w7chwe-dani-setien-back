import "./loadEnvironments.js";
import createDebug from "debug";
import { startServer } from "./server/startServer.js";

const debug = createDebug("sn:root");

const port = process.env.PORT ?? 4001;
const mongoUrl = process.env.ROBOTS_DATABASE!;

try {
  await startServer(Number(port));
  debug(`Connected to server on port ${port} `);
} catch (error: unknown) {
  debug((error as Error).message);
}
