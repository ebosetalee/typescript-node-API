import "dotenv/config";
import compression from "compression";
import express from "express";
import logger from "./utils/logger";
import errorHandler from "./middleware/error-handler";
import bodyParser from "./middleware/body-parser";
import v1Routes from "./v1"

const app = express();

app.use(compression())
app.use(bodyParser);
app.use(express.static("public"))

app.use("/api/v1", v1Routes);

app.use(errorHandler);

process.on("uncaughtException", err => {
    logger.error("UNCAUGHT EXCEPTION! 💥 Shutting down...");
    logger.error(err);
    process.exit(1);
});

export default app;
