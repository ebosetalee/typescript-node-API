/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { INTERNAL_SERVER_ERROR, NOT_FOUND, CONFLICT, PRECONDITION_FAILED } from "http-status";
import logger from "../utils/logger";
import { NextFunction, Request, Response } from "express";
import ErrorResponse from "error/index";

async function errorHandler({
    err,
    _req,
    res,
    next,
}: {
    err: ErrorResponse | any;
    _req: Request;
    res: Response;
    next: NextFunction;
}) {
    logger.error(err);
    const error = {
        code: err.code || INTERNAL_SERVER_ERROR,
        message: err.message || "Something went wrong try again later",
        metadata: err.metadata
    };

    if (err.name == "ValidationError") {
        if (typeof err.message == "string") {
            error.message = err.message.replace(/"/g, "");
        } else {
            error.message = Object.values(err.errors)
                .map((value: {message: string}): string => value.message)
                .join(",");
        }
        error.code = PRECONDITION_FAILED;
    }
    if (err.code === 11000) {
        error.message = `Duplicate value entered for ${Object.keys(err.keyValue)} field, please choose another value`;
        error.code = CONFLICT;
    }
    if (err.name == "CastError") {
        if (err.path.match(/id/i)) {
            error.message = `No item found with id : ${err.value}`;
        } else {
            error.message = err.message.replace(/"/g, "");
        }
        error.code = NOT_FOUND;
    }
    return res.status(error.code).send(error);
}

export default errorHandler;
