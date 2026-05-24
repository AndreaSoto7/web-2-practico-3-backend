const Joi = require("joi");

const publicacionSchema = Joi.object({
    texto: Joi.string().min(1).required(),
    imagenUrl: Joi.string().uri().allow('', null),
});

const comentarioSchema = Joi.object({
    texto: Joi.string().min(1).required(),
});

module.exports = {
    publicacionSchema,
    comentarioSchema,
};
