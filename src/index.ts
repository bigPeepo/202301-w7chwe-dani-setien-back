import "./loadEnvironments.js";
import createDebug from "debug";
import { startServer } from "./server/startServer.js";
import connectDatabase from "./database/connectDatabase.js";

const debug = createDebug("sn:root");

const port = process.env.PORT! || 4001;
const mongoUrl = process.env.ROBOTS_DATABASE!;

try {
  await startServer(Number(port));
  debug(`Server listening on port ${port}.`);

  await connectDatabase(mongoUrl);
  debug("Connected to database.");
} catch (error: unknown) {
  debug((error as Error).message);
}
