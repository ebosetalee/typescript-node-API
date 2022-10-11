import logger from "@root/utils/logger.js";
import amqp from "amqplib/callback_api.js";

const amqpUrl = process.env.AMQP_URL || "";

// create rabbitmq connection to a single queue

export default async function Subscribe() {
    let data;
    amqp.connect(amqpUrl, (err, conn) => {
        if (err) throw err;

        // create channel
        conn.createChannel((cErr, channel) => {
            if (cErr) throw cErr;

            // assert channel
            const QUEUE = process.env.QUEUE || "nodejstest";
            channel.assertQueue(QUEUE);

            channel.consume(
                QUEUE,
                (msg: { content: Buffer }) => {
                    const newMsg = JSON.parse(msg.content.toString());

                    // use data from Queue as needed.
                    logger.debug(`content: ${newMsg}`);
                    logger.debug(`message received: ${msg.content}`);
                    logger.debug(`content: ${typeof msg.content}`);
                    data = newMsg;
                },
                { noAck: true },
            );
            setTimeout(() => conn.close(), 1000);
        });
    });
    return data;
}
