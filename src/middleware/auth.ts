import { PRECONDITION_FAILED, NOT_FOUND } from "http-status";
import { tokenVerifier } from "../utils/jwt";
import { NextFunction, Request, Response } from "express";
// import ErrorResponse from "../error";

const Auth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            // throw new ErrorResponse("No token provided", NOT_FOUND );
            return res.status(NOT_FOUND).json({ message: "No token provided" });
        }

        const token = authHeader.split(" ")[1];
        const decoded = tokenVerifier(token);

        if (!decoded.id) {
            // throw new ErrorResponse("Access Denied! Token Expired", PRECONDITION_FAILED);
            return res.status(PRECONDITION_FAILED).json({ message: "Access Denied! Token Expired" });
        }

        req["user"] = decoded;
        next();
    } catch (error) {
        return res.status(PRECONDITION_FAILED).json({ message: error.message });
    }
};

export default Auth;
