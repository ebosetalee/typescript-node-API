import { ServerResponse } from "http";
import express, { NextFunction, Request, Response } from "express";
import ErrorResponse from "../error";

function bodyParser(req: Request, res: Response, next: NextFunction): void {
    express.json()(req, res as ServerResponse, err => {
        if (err) {
            return next(new ErrorResponse("Failed to parse request body", 400));
        }

        next();
    });
}

export default bodyParser;
