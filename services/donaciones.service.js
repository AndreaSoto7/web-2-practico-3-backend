const { Op } = require("sequelize");
const db = require("../models");

const donacionesService = {
    createObject: async ({ seguidorId, perfilCreadorId, cantidadFlanes }) => {
        return db.donacion.create({ seguidorId, perfilCreadorId, cantidadFlanes });
    },
    hasDonation: async (seguidorId, perfilCreadorId) => {
        const donation = await db.donacion.findOne({ where: { seguidorId, perfilCreadorId } });
        return Boolean(donation);
    },
    getHistory: async ({ seguidorId, fechaInicio, fechaFin, creador }) => {
        const where = { seguidorId };
        if (fechaInicio || fechaFin) {
            where.createdAt = {};
            if (fechaInicio) where.createdAt[Op.gte] = new Date(fechaInicio);
            if (fechaFin) where.createdAt[Op.lte] = new Date(fechaFin);
        }

        const include = [{
            association: 'perfilCreador',
            where: creador ? { nombrePublico: { [Op.like]: `%${creador}%` } } : undefined,
        }];

        return db.donacion.findAll({
            where,
            include,
            order: [['createdAt', 'DESC']],
        });
    },
    getCreatorReport: async (perfilCreadorId) => {
        const donaciones = await db.donacion.findAll({
            where: { perfilCreadorId },
            include: [{ association: 'seguidor' }],
            order: [['createdAt', 'DESC']],
        });
        const totalFlanes = donaciones.reduce((total, donacion) => total + donacion.cantidadFlanes, 0);
        const totalBs = donaciones.reduce((total, donacion) => total + (donacion.cantidadFlanes * donacion.montoUnitario), 0);
        return { totalFlanes, totalBs, donaciones };
    },
};

module.exports = donacionesService;
