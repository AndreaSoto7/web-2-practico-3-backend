const creadoresService = require("../services/creadores.service");
const donacionesService = require("../services/donaciones.service");

exports.getCreadores = async (req, res) => {
    const creadores = await creadoresService.getObjectList({ q: req.query.q });
    res.json(creadores);
};

exports.getCreadorById = async (req, res) => {
    res.json(req.obj);
};

exports.postPerfil = async (req, res) => {
    const existingProfile = await creadoresService.getByUserId(req.user.id);
    if (existingProfile) {
        return res.status(400).json({ message: "El creador ya tiene un perfil publico" });
    }
    const perfil = await creadoresService.createObject({ ...req.body, usuarioId: req.user.id });
    res.status(201).json(perfil);
};

exports.putPerfil = async (req, res) => {
    const perfil = await creadoresService.getByUserId(req.user.id);
    if (!perfil) {
        return res.status(404).json({ message: "Primero debes crear tu perfil publico" });
    }
    res.json(await creadoresService.updateObject(perfil.id, req.body));
};

exports.getMiPanel = async (req, res) => {
    const perfil = await creadoresService.getByUserId(req.user.id);
    if (!perfil) {
        return res.status(404).json({ message: "Primero debes crear tu perfil publico" });
    }
    res.json(await creadoresService.getDashboard(perfil.id));
};

exports.getIngresos = async (req, res) => {
    const perfil = await creadoresService.getByUserId(req.user.id);
    if (!perfil) {
        return res.status(404).json({ message: "Primero debes crear tu perfil publico" });
    }
    const dashboard = await creadoresService.getDashboard(perfil.id);
    const reporte = await donacionesService.getCreatorReport(perfil.id);
    res.json({ ...reporte, publicaciones: dashboard.publicaciones });
};
