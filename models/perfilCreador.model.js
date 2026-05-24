const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const PerfilCreador = sequelize.define('PerfilCreador', {
        nombrePublico: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        biografia: {
            type: DataTypes.TEXT,
        },
        fotoPerfilUrl: {
            type: DataTypes.STRING,
        },
        bannerUrl: {
            type: DataTypes.STRING,
        },
        usuarioId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
        },
    });

    return PerfilCreador;
};
