import amqp from "amqplib/callback_api.js";
import logger from "@root/utils/logger.js";

// create rabbitmq connection
export default async function Publish(data: object) {
    amqp.connect("amqp://localhost", (err, conn) => {
        if (err) throw err;

        // create channel
        conn.createChannel((cErr, channel) => {
            if (cErr) throw cErr;

            // assert channel
            const QUEUE = process.env.QUEUE || "nodejstest";
            channel.assertQueue(QUEUE);

            // const data = {
            //     name: "Susan",
            //     age: 20,
            //     purpose: "advertisement",
            //     screening_fee: 500,
            //     advertisement: true
            // };

            // send to queue
            channel.sendToQueue(QUEUE, Buffer.from(JSON.stringify(data)));

            logger.debug(`message sent to ${QUEUE}`);
            setTimeout(() => conn.close(), 1000);
        });
    });
}
