const { Op } = require("sequelize");
const db = require("../models");

const creadoresService = {
    getObjectList: async ({ q } = {}) => {
        const where = q ? { nombrePublico: { [Op.like]: `%${q}%` } } : {};
        return db.perfilCreador.findAll({
            where,
            order: [['nombrePublico', 'ASC']],
            include: [
                { association: 'metas', where: { activa: true }, required: false },
            ],
        });
    },
    getById: async (id) => {
        return db.perfilCreador.findByPk(id, {
            include: [
                { association: 'usuario' },
                { association: 'metas', where: { activa: true }, required: false },
            ],
        });
    },
    getByUserId: async (usuarioId) => {
        return db.perfilCreador.findOne({ where: { usuarioId } });
    },
    createObject: async ({ nombrePublico, biografia, fotoPerfilUrl, bannerUrl, usuarioId }) => {
        return db.perfilCreador.create({
            nombrePublico,
            biografia,
            fotoPerfilUrl,
            bannerUrl,
            usuarioId,
        });
    },
    updateObject: async (id, data) => {
        const perfil = await db.perfilCreador.findByPk(id);
        perfil.nombrePublico = data.nombrePublico;
        perfil.biografia = data.biografia;
        perfil.fotoPerfilUrl = data.fotoPerfilUrl;
        perfil.bannerUrl = data.bannerUrl;
        return perfil.save();
    },
    getDashboard: async (perfilCreadorId) => {
        return db.perfilCreador.findByPk(perfilCreadorId, {
            include: [
                { association: 'metas' },
                {
                    association: 'publicaciones',
                    include: [{ association: 'comentarios', include: [{ association: 'seguidor' }] }],
                },
                { association: 'donaciones' },
            ],
        });
    },
};

module.exports = creadoresService;
