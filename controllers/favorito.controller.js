const creadoresService = require("../services/creadores.service");
const favoritosService = require("../services/favoritos.service");

exports.getFavoritos = async (req, res) => {
    res.json(await favoritosService.getObjectList(req.user.id));
};

exports.postFavorito = async (req, res) => {
    const creador = await creadoresService.getById(req.params.creadorId);
    if (!creador) {
        return res.status(404).json({ message: "Creador no encontrado" });
    }
    const favorito = await favoritosService.createObject({
        seguidorId: req.user.id,
        perfilCreadorId: req.params.creadorId,
    });
    res.status(201).json(favorito);
};

exports.deleteFavorito = async (req, res) => {
    await favoritosService.deleteObject({
        seguidorId: req.user.id,
        perfilCreadorId: req.params.creadorId,
    });
    res.json({ message: "Favorito eliminado correctamente" });
};
