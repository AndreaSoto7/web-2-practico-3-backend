const db = require("../models");

const comentariosService = {
    createObject: async ({ texto, seguidorId, publicacionId }) => {
        return db.comentario.create({ texto, seguidorId, publicacionId });
    },
};

module.exports = comentariosService;
