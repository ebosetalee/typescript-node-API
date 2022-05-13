import { NextFunction, Request, Response } from "express";
import { CONFLICT, CREATED, NOT_FOUND } from "http-status";
import logger from "../../utils/logger";
import { generateJwtToken } from "../../utils/jwt";
import { hash } from "../../utils";
import ErrorResponse from "../../error";
import User from "../models/users";

export async function createUser(req: Request, res: Response, next: NextFunction) {
    try {
        logger.debug("Creating new user...");

        const data = req.body;

        const userAvailable = await User.findOne({ $or: [{ email: data.email }, { username: data.username }] });

        if (userAvailable) {
            throw new ErrorResponse("User Available", CONFLICT);
        }

        data.password = await hash(data.password);

        const user = await User.create(data);

        Reflect.deleteProperty(user._doc, "password");

        const token = await generateJwtToken(data);

        return res.status(CREATED).json({ message: "User Created Successfully", data: { token, user } });
    } catch (error) {
        next(error);
    }
}

export async function currentUser(req: Request, res: Response, next: NextFunction) {
    try {
        const user = await User.findOne({ username: req.params.username });

        if (!user) {
            return res.status(NOT_FOUND).json({ message: "User not available" });
        }

        res.status(200).json({ message: "User details retrieved", user });
    } catch (error) {
        return next(error);
    }
}
