import jwt from "jsonwebtoken";
import { AuthResponse } from "types";

export async function generateJwtToken(data: AuthResponse) {
    return jwt.sign(
        {
            id: data.id, // We are gonna use this in the middleware 'isAuth'
            username: data.username,
            email: data.email,
            role: data.role
        },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRATION }
    );
}


export const tokenVerifier = (authToken: string ): AuthResponse => {
    const decoded = jwt.verify(authToken, process.env.JWT_SECRET);

    return decoded as AuthResponse;
};