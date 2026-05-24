const requireRole = require("../middlewares/role.middleware.js");
const requireAuth = require("../middlewares/user.middleware.js");

module.exports = app => {
    let router = require("express").Router();
    const controller = require("../controllers/favorito.controller.js");

    router.get("/", requireAuth, requireRole('seguidor'), controller.getFavoritos);
    router.post("/:creadorId", requireAuth, requireRole('seguidor'), controller.postFavorito);
    router.delete("/:creadorId", requireAuth, requireRole('seguidor'), controller.deleteFavorito);

    app.use('/favoritos', router);
};
