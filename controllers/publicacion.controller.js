const creadoresService = require("../services/creadores.service");
const publicacionesService = require("../services/publicaciones.service");
const donacionesService = require("../services/donaciones.service");
const comentariosService = require("../services/comentarios.service");

const getOwnProfileOrResponse = async (req, res) => {
    const perfil = await creadoresService.getByUserId(req.user.id);
    if (!perfil) {
        res.status(404).json({ message: "Primero debes crear tu perfil publico" });
        return null;
    }
    return perfil;
};

exports.postPublicacion = async (req, res) => {
    const perfil = await getOwnProfileOrResponse(req, res);
    if (!perfil) return;
    const publicacion = await publicacionesService.createObject({ ...req.body, perfilCreadorId: perfil.id });
    res.status(201).json(publicacion);
};

exports.getMisPublicaciones = async (req, res) => {
    const perfil = await getOwnProfileOrResponse(req, res);
    if (!perfil) return;
    res.json(await publicacionesService.getByCreatorId(perfil.id));
};

exports.getPublicacionesPorCreador = async (req, res) => {
    const { creadorId } = req.params;
    const puedeVer = await donacionesService.hasDonation(req.user.id, creadorId);
    if (!puedeVer) {
        return res.status(403).json({ message: "Debes enviar al menos un flan para ver las publicaciones" });
    }
    res.json(await publicacionesService.getByCreatorId(creadorId));
};

exports.getFeed = async (req, res) => {
    res.json(await publicacionesService.getFeedForFollower(req.user.id));
};

exports.putPublicacion = async (req, res) => {
    const perfil = await getOwnProfileOrResponse(req, res);
    if (!perfil) return;
    if (req.obj.perfilCreadorId !== perfil.id) {
        return res.status(403).json({ message: "No puedes modificar publicaciones de otro creador" });
    }
    res.json(await publicacionesService.updateObject(req.obj.id, req.body));
};

exports.deletePublicacion = async (req, res) => {
    const perfil = await getOwnProfileOrResponse(req, res);
    if (!perfil) return;
    if (req.obj.perfilCreadorId !== perfil.id) {
        return res.status(403).json({ message: "No puedes eliminar publicaciones de otro creador" });
    }
    await publicacionesService.deleteObject(req.obj.id);
    res.json({ message: "Publicacion eliminada correctamente" });
};

exports.postComentario = async (req, res) => {
    const publicacion = req.obj;
    const puedeComentar = await donacionesService.hasDonation(req.user.id, publicacion.perfilCreadorId);
    if (!puedeComentar) {
        return res.status(403).json({ message: "Debes enviar al menos un flan para comentar publicaciones" });
    }
    const comentario = await comentariosService.createObject({
        texto: req.body.texto,
        seguidorId: req.user.id,
        publicacionId: publicacion.id,
    });
    res.status(201).json(comentario);
};
