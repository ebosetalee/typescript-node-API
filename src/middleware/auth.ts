import { PRECONDITION_FAILED, NOT_FOUND } from "http-status";
import { tokenVerifier } from "../utils/jwt";
import { NextFunction, Request, Response } from "express";
import ErrorResponse from "../error";
import ValidationError from "../error/validation-error";

const Auth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            throw new ErrorResponse("No token provided", NOT_FOUND );
        }

        const token = authHeader.split(" ")[1];
        const decoded = tokenVerifier(token);

        if (!decoded.id) {
            throw new ErrorResponse("Access Denied! Token Expired", PRECONDITION_FAILED);
        }

        req["user"] = decoded;
        next();
    } catch (error) {
       next(new ValidationError(error.message, PRECONDITION_FAILED, error))
    }
};

export default Auth;
