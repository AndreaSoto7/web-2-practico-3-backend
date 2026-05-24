const getObjectOr404 = require("../middlewares/getObjectOr404.middleware.js");
const { isJsonRequestValid } = require("../middlewares/isJsonRequestValid.middleware.js");
const schemaValidation = require("../middlewares/schemaValidation.middleware.js");
const requireRole = require("../middlewares/role.middleware.js");
const requireAuth = require("../middlewares/user.middleware.js");
const creadoresService = require("../services/creadores.service.js");
const { perfilCreadorSchema } = require("../validators/creador.schema.js");

module.exports = app => {
    let router = require("express").Router();
    const controller = require("../controllers/creador.controller.js");

    router.get("/", controller.getCreadores);
    router.get("/me/panel", requireAuth, requireRole('creador'), controller.getMiPanel);
    router.get("/me/ingresos", requireAuth, requireRole('creador'), controller.getIngresos);
    router.post("/perfil", requireAuth, requireRole('creador'), isJsonRequestValid, schemaValidation(perfilCreadorSchema), controller.postPerfil);
    router.put("/perfil", requireAuth, requireRole('creador'), isJsonRequestValid, schemaValidation(perfilCreadorSchema), controller.putPerfil);
    router.get("/:id", getObjectOr404(creadoresService), controller.getCreadorById);

    app.use('/creadores', router);
};
