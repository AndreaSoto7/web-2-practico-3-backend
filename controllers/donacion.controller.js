const creadoresService = require("../services/creadores.service");
const donacionesService = require("../services/donaciones.service");

exports.postDonacion = async (req, res) => {
    const creador = await creadoresService.getById(req.body.creadorId);
    if (!creador) {
        return res.status(404).json({ message: "Creador no encontrado" });
    }
    const donacion = await donacionesService.createObject({
        seguidorId: req.user.id,
        perfilCreadorId: req.body.creadorId,
        cantidadFlanes: req.body.cantidadFlanes,
    });
    res.status(201).json(donacion);
};

exports.getHistorial = async (req, res) => {
    const historial = await donacionesService.getHistory({
        seguidorId: req.user.id,
        fechaInicio: req.query.fechaInicio,
        fechaFin: req.query.fechaFin,
        creador: req.query.creador,
    });
    res.json(historial);
};
