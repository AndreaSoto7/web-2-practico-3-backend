const creadoresService = require("../services/creadores.service");
const metasService = require("../services/metas.service");

const getOwnProfileOrResponse = async (req, res) => {
    const perfil = await creadoresService.getByUserId(req.user.id);
    if (!perfil) {
        res.status(404).json({ message: "Primero debes crear tu perfil publico" });
        return null;
    }
    return perfil;
};

exports.postMeta = async (req, res) => {
    const perfil = await getOwnProfileOrResponse(req, res);
    if (!perfil) return;
    const meta = await metasService.createObject({ ...req.body, perfilCreadorId: perfil.id });
    res.status(201).json(meta);
};

exports.putMeta = async (req, res) => {
    const perfil = await getOwnProfileOrResponse(req, res);
    if (!perfil) return;
    if (req.obj.perfilCreadorId !== perfil.id) {
        return res.status(403).json({ message: "No puedes modificar metas de otro creador" });
    }
    res.json(await metasService.updateObject(req.obj.id, req.body));
};

exports.deleteMeta = async (req, res) => {
    const perfil = await getOwnProfileOrResponse(req, res);
    if (!perfil) return;
    if (req.obj.perfilCreadorId !== perfil.id) {
        return res.status(403).json({ message: "No puedes eliminar metas de otro creador" });
    }
    await metasService.deleteObject(req.obj.id);
    res.json({ message: "Meta eliminada correctamente" });
};
