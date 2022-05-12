import { Request, Response, NextFunction } from "express";
import { PRECONDITION_FAILED } from "http-status";
import ValidationError from "../error/validation-error";

const validate =
    (schema, stripUnknown = false) =>
    (req: Request, _res: Response, next: NextFunction) => {
        const { value, error } = schema.validate(req.body, { abortEarly: false, allowUnknown: true, stripUnknown });

        if (error) {
            const errorDetails = error.details.map(detail => detail.message).join(", ");

            throw new ValidationError(`Invalid input: ${errorDetails}`, PRECONDITION_FAILED, {
                failed_fields: error.details.map(err => err.path.join("."))
            });
        }

        Object.assign(req, value);
        return next();
    };

export default validate;
