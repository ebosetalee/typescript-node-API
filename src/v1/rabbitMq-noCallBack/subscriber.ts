import subscriber from "./rabbitMq";
import logger from "@root/utils/logger";

const mailKey = {
    key: process.env.EMAIL_KEY || "",
    domain: process.env.EMAIL_DOMAIN || "",
};

const sender = "Sender <noreply@sender.com>";
const amqpUrl = process.env.AMQP_URL || "";

/**
 * Subscribe listener to listen for message broker triggers
 */
export default async function Subscribe() {
    try {
        await subscriber.init(amqpUrl);
    } catch (error) {
        console.log("RabbitMQ subscriber connection unsuccessful, retry after 5 seconds.");
        setTimeout(Subscribe, 5000);
    }

    subscriber.consume(
        "email.password.token",
        async (msg: { content: string }) => {
            try {
                const data = JSON.parse(msg.content);

                const { name, token, email } = data;

                // send email to user
                let messages;
                messages.create(mailKey, {
                    from: sender,
                    to: email,
                    subject: "Password Reset",
                    html: `<h3> Hello ${name}, </h3> <br>
                    <p>You have just requested that your password be reset. Kindly reset by entering <b>${token}</b> in the application when prompted.<br>
                    This token is only valid for 5 minutes after it's created.</p>`,
                });
                logger.debug(`message received: ${messages}`);

                subscriber.acknowledgeMessage(msg);
            } catch (error) {
                logger.error("error sending user email password token", error);
            }
        },
        3,
        null,
    );

    // Test
    subscriber.consume(
        "test",
        async (msg: { content: string }) => {
            try {
                const data = JSON.parse(msg.content);
                logger.debug(`content: ${data}`);
                logger.debug(`message received: ${msg.content}`);
                subscriber.acknowledgeMessage(msg);
            } catch (error) {
                logger.error("error testing INSERT_NAME_OF_MAIL_DATA", error);
            }
        },
        3,
        null,
    );
}
