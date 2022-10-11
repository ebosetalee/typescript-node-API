// In controller, call the function needed from the publisher to send data to the queue e.g

import { NextFunction, Request, Response } from "express";
import { UserPasswordResetToken } from "./publisher";
import logger from "@root/utils/logger";
import { createOTP, hash } from "@root/utils";

export async function sendTestMessage(req: Request, res: Response, next: NextFunction) {
    try {
        logger.debug("Testing sending message to Queue...");

        // send mail notification
        const data = { email: "ertukep@gmail.com", token: await hash(createOTP()), name: "Emmanuella Tukpe" };

        await UserPasswordResetToken(data);

        return res.status(200).json({ message: "User signed in successfully", data });
    } catch (error) {
        next(error);
    }
}

// To consume messages from the queue using the subscriber, start the subscriber in the index and ensure to close the subscriber e.g

import Subscribe from "./subscriber";
import RabbitMQ from "./rabbitMq";

Subscribe();

process.once("SIGINT", async () => {
    if (RabbitMQ.connection) await RabbitMQ.close();
});