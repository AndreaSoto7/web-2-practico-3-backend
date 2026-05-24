const Joi = require("joi");

const registerUserSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    rol: Joi.string().valid('creador', 'seguidor').required()
});
const updateUserSchema = Joi.object({
    email: Joi.string().email().required()
});
const loginUserSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});
module.exports = {
    registerUserSchema,
    loginUserSchema,
    updateUserSchema
};
