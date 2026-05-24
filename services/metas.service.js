const db = require("../models");

const metasService = {
    createObject: async ({ titulo, descripcion, perfilCreadorId }) => {
        return db.metaApoyo.create({ titulo, descripcion, perfilCreadorId });
    },
    getById: async (id) => {
        return db.metaApoyo.findByPk(id);
    },
    updateObject: async (id, { titulo, descripcion, activa }) => {
        const meta = await metasService.getById(id);
        meta.titulo = titulo;
        meta.descripcion = descripcion;
        if (activa !== undefined) {
            meta.activa = activa;
        }
        return meta.save();
    },
    deleteObject: async (id) => {
        const meta = await metasService.getById(id);
        return meta.destroy();
    },
};

module.exports = metasService;
