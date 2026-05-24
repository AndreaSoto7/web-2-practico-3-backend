const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const MetaApoyo = sequelize.define('MetaApoyo', {
        titulo: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        descripcion: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        activa: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
        perfilCreadorId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    });

    return MetaApoyo;
};
