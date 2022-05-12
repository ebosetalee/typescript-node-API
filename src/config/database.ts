import mongoose from "mongoose";

export async function connectToDB() {
    await mongoose
        .connect(process.env.MONGO_URI)
        .then(() => {
            console.log("Connected to Database....");
        })
        .catch(err => {
            console.log("Error: ", err);
            throw err;
        });
}

export function close() {
    return mongoose.disconnect();
}