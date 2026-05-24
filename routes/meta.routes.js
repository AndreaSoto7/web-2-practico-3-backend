const getObjectOr404 = require("../middlewares/getObjectOr404.middleware.js");
const { isJsonRequestValid } = require("../middlewares/isJsonRequestValid.middleware.js");
const schemaValidation = require("../middlewares/schemaValidation.middleware.js");
const requireRole = require("../middlewares/role.middleware.js");
const requireAuth = require("../middlewares/user.middleware.js");
const metasService = require("../services/metas.service.js");
const { metaApoyoSchema } = require("../validators/creador.schema.js");

module.exports = app => {
    let router = require("express").Router();
    const controller = require("../controllers/meta.controller.js");

    router.post("/", requireAuth, requireRole('creador'), isJsonRequestValid, schemaValidation(metaApoyoSchema), controller.postMeta);
    router.put("/:id", requireAuth, requireRole('creador'), getObjectOr404(metasService), isJsonRequestValid, schemaValidation(metaApoyoSchema), controller.putMeta);
    router.delete("/:id", requireAuth, requireRole('creador'), getObjectOr404(metasService), controller.deleteMeta);

    app.use('/metas', router);
};
