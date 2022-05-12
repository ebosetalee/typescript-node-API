import app from "./app";
import { connectToDB } from "./config/database";

const port = process.env.PORT || 3041;

process.on("unhandledRejection", err => {
    console.error("UNHANDLED REJECTION! 💥 Shutting down...");
    console.error(err);
    process.exit(1);
});

connectToDB()
    .then(() => {
        app.listen(port, () => {
            console.log(`server is runnng on port: ${port}`);
        });
    })
    .catch(() => {
        console.log("Database connection failed");
    });
