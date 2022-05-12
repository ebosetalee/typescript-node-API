import bcrypt from "bcrypt";

export async function hash(param: string | Buffer) {
    return await bcrypt.hash(param, 12);
}

export async function verifyHash(param: string | Buffer, hashedPram: string) {
    return await bcrypt.compare(param, hashedPram);
}

export const createOTP = () => Math.floor(100000 + Math.random() * 900000).toString();
