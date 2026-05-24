const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const Publicacion = sequelize.define('Publicacion', {
        texto: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        imagenUrl: {
            type: DataTypes.STRING,
        },
        perfilCreadorId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    });

    return Publicacion;
};
