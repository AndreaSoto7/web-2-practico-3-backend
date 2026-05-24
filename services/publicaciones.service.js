const db = require("../models");

const publicacionesService = {
    createObject: async ({ texto, imagenUrl, perfilCreadorId }) => {
        return db.publicacion.create({ texto, imagenUrl, perfilCreadorId });
    },
    getById: async (id) => {
        return db.publicacion.findByPk(id, {
            include: [
                { association: 'perfilCreador' },
                { association: 'comentarios', include: [{ association: 'seguidor' }] },
            ],
        });
    },
    getByCreatorId: async (perfilCreadorId) => {
        return db.publicacion.findAll({
            where: { perfilCreadorId },
            order: [['createdAt', 'DESC']],
            include: [{ association: 'comentarios', include: [{ association: 'seguidor' }] }],
        });
    },
    getFeedForFollower: async (seguidorId) => {
        const donaciones = await db.donacion.findAll({ where: { seguidorId } });
        const creatorIds = [...new Set(donaciones.map((donacion) => donacion.perfilCreadorId))];
        if (creatorIds.length === 0) {
            return [];
        }
        return db.publicacion.findAll({
            where: { perfilCreadorId: creatorIds },
            order: [['createdAt', 'DESC']],
            include: [{ association: 'perfilCreador' }],
        });
    },
    updateObject: async (id, { texto, imagenUrl }) => {
        const publicacion = await publicacionesService.getById(id);
        publicacion.texto = texto;
        publicacion.imagenUrl = imagenUrl;
        return publicacion.save();
    },
    deleteObject: async (id) => {
        const publicacion = await publicacionesService.getById(id);
        return publicacion.destroy();
    },
};

module.exports = publicacionesService;
