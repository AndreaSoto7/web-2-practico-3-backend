const Joi = require("joi");

const donacionSchema = Joi.object({
    creadorId: Joi.number().integer().required(),
    cantidadFlanes: Joi.number().integer().min(1).required(),
});

module.exports = {
    donacionSchema,
};
