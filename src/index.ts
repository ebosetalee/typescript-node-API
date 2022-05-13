import app from "./app";
import logger from "./utils/logger";
import { connectToDB } from "./config/database";

const port = process.env.PORT || 3041;

process.on("unhandledRejection", err => {
    logger.error("UNHANDLED REJECTION! 💥 Shutting down...");
    logger.error(err);
    process.exit(1);
});

connectToDB()
    .then(() => {
        app.listen(port, () => {
            logger.debug(`server is runnng on port: ${port}`);
        });
    })
    .catch(() => {
        logger.error("Database connection failed");
    });
