import Publisher from "./rabbitMq";

interface EmailMessageParams {
    email: string;
}

interface ClientPasswordToken extends EmailMessageParams {
    token: string;
    name: string;
}

const amqp_url = process.env.AMQP_URL || "";

export const UserPasswordResetToken = async (data: ClientPasswordToken) => {
    await Publisher.init(amqp_url);
    await Publisher.queue("email.password.token", data, null);

    // close connection
    setTimeout(async () => await Publisher.close(), 1000);
};

export const Test = async (data: ClientPasswordToken) => {
    await Publisher.init(amqp_url);
    await Publisher.queue("test", data, null);

    // close connection
    setTimeout(async () => await Publisher.close(), 1000);
};
