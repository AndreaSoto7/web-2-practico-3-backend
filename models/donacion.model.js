const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const Donacion = sequelize.define('Donacion', {
        cantidadFlanes: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        tipoApoyo: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'flan',
        },
        montoUnitario: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 10,
        },
        seguidorId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        perfilCreadorId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    });

    return Donacion;
};
