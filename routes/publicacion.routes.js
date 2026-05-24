const getObjectOr404 = require("../middlewares/getObjectOr404.middleware.js");
const { isJsonRequestValid } = require("../middlewares/isJsonRequestValid.middleware.js");
const schemaValidation = require("../middlewares/schemaValidation.middleware.js");
const requireRole = require("../middlewares/role.middleware.js");
const requireAuth = require("../middlewares/user.middleware.js");
const publicacionesService = require("../services/publicaciones.service.js");
const { publicacionSchema, comentarioSchema } = require("../validators/publicacion.schema.js");

module.exports = app => {
    let router = require("express").Router();
    const controller = require("../controllers/publicacion.controller.js");

    router.get("/feed", requireAuth, requireRole('seguidor'), controller.getFeed);
    router.get("/mis", requireAuth, requireRole('creador'), controller.getMisPublicaciones);
    router.get("/creador/:creadorId", requireAuth, requireRole('seguidor'), controller.getPublicacionesPorCreador);
    router.post("/", requireAuth, requireRole('creador'), isJsonRequestValid, schemaValidation(publicacionSchema), controller.postPublicacion);
    router.put("/:id", requireAuth, requireRole('creador'), getObjectOr404(publicacionesService), isJsonRequestValid, schemaValidation(publicacionSchema), controller.putPublicacion);
    router.delete("/:id", requireAuth, requireRole('creador'), getObjectOr404(publicacionesService), controller.deletePublicacion);
    router.post("/:id/comentarios", requireAuth, requireRole('seguidor'), getObjectOr404(publicacionesService), isJsonRequestValid, schemaValidation(comentarioSchema), controller.postComentario);

    app.use('/publicaciones', router);
};
