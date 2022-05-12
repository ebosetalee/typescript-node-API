import Joi from "joi";

const CREATE = Joi.object().keys({
    username: Joi.string().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string()
        .required()
        .regex(/(234|0)[7-9][0-1][0-9]{8}/),
    password: Joi.string().required(),
    role: Joi.string().allow("super_admin", "admin", "regular").optional()
});

export default {
    CREATE
};
