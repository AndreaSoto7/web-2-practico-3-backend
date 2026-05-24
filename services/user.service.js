const db = require("../models");
const userService = {
    getById: async (id) => {
        return await db.usuario.findByPk(id, {
            include: ["perfilCreador"]
        });
    },
    findUserByEmail: async (email) => {
        return await db.usuario.scope('withPassword').findOne({
            where: {
                email
            }
        });
    },
    createUser: async (email, password, rol) => {
        return await db.usuario.create({
            email,
            password,
            rol

        });
    },
    updateObject: async (id, email) => {
        const user = await userService.getById(id);
        user.email = email;
        return await user.save();
    },
    deleteObject: async (id) => {
        const user = await userService.getById(id);
        return await user.destroy();
    }
};
module.exports = userService;
