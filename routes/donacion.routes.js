const { isJsonRequestValid } = require("../middlewares/isJsonRequestValid.middleware.js");
const schemaValidation = require("../middlewares/schemaValidation.middleware.js");
const requireRole = require("../middlewares/role.middleware.js");
const requireAuth = require("../middlewares/user.middleware.js");
const { donacionSchema } = require("../validators/donacion.schema.js");

module.exports = app => {
    let router = require("express").Router();
    const controller = require("../controllers/donacion.controller.js");

    router.post("/", requireAuth, requireRole('seguidor'), isJsonRequestValid, schemaValidation(donacionSchema), controller.postDonacion);
    router.get("/historial", requireAuth, requireRole('seguidor'), controller.getHistorial);

    app.use('/donaciones', router);
};
