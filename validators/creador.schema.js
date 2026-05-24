const Joi = require("joi");

const perfilCreadorSchema = Joi.object({
    nombrePublico: Joi.string().min(2).max(120).required(),
    biografia: Joi.string().allow('', null),
    fotoPerfilUrl: Joi.string().uri().allow('', null),
    bannerUrl: Joi.string().uri().allow('', null),
});

const metaApoyoSchema = Joi.object({
    titulo: Joi.string().min(2).max(120).required(),
    descripcion: Joi.string().min(2).required(),
    activa: Joi.boolean(),
});

module.exports = {
    perfilCreadorSchema,
    metaApoyoSchema,
};
