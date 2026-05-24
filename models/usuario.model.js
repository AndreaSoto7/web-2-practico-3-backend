const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {

    const Usuario = sequelize.define(
        'Usuario',
        {
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false
            },
            rol: {
                type: DataTypes.ENUM('creador', 'seguidor'),
                allowNull: false
            },
        }, {
        defaultScope: {
            attributes: { exclude: ['password'] }
        },
        scopes: {
            withPassword: {
                attributes: { include: ['password'] },
            }
        }
    }
    );
    return Usuario;
}
