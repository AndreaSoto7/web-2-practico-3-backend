const db = require("../models");

const favoritosService = {
    getObjectList: async (seguidorId) => {
        return db.favorito.findAll({
            where: { seguidorId },
            include: [{ association: 'perfilCreador', include: [{ association: 'metas' }] }],
            order: [['createdAt', 'DESC']],
        });
    },
    createObject: async ({ seguidorId, perfilCreadorId }) => {
        const [favorito] = await db.favorito.findOrCreate({
            where: { seguidorId, perfilCreadorId },
            defaults: { seguidorId, perfilCreadorId },
        });
        return favorito;
    },
    deleteObject: async ({ seguidorId, perfilCreadorId }) => {
        return db.favorito.destroy({ where: { seguidorId, perfilCreadorId } });
    },
};

module.exports = favoritosService;
