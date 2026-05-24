const getObjectOr404 = require("../middlewares/getObjectOr404.middleware.js");
const { isJsonRequestValid } = require("../middlewares/isJsonRequestValid.middleware.js");
const schemaValidation = require("../middlewares/schemaValidation.middleware.js");
const requireAuth = require("../middlewares/user.middleware.js");
const userService = require("../services/user.service.js");
const { registerUserSchema, loginUserSchema, updateUserSchema } = require("../validators/user.schema.js");

module.exports = app => {
    let router = require("express").Router();
    const controller = require("../controllers/auth.controller.js");
    router.post('/register', isJsonRequestValid, schemaValidation(registerUserSchema), controller.postRegister);
    router.post('/login', isJsonRequestValid, schemaValidation(loginUserSchema), controller.postLogin);
    router.post('/logout', requireAuth, controller.logout);
    router.put('/update/:id', requireAuth, isJsonRequestValid, getObjectOr404(userService), schemaValidation(updateUserSchema), controller.putUserUpdate);
    router.delete('/:id', requireAuth, getObjectOr404(userService), controller.deleteUser);
    router.get('/me', requireAuth, controller.me);
    app.use('/auth', router);
};
