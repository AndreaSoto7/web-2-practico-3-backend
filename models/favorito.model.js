const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const Favorito = sequelize.define('Favorito', {
        seguidorId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        perfilCreadorId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    });

    return Favorito;
};
