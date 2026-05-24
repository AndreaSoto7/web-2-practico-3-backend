const { sequelize } = require('../config/db.config');

const usuario = require('./usuario.model')(sequelize);
const perfilCreador = require('./perfilCreador.model')(sequelize);
const metaApoyo = require('./metaApoyo.model')(sequelize);
const publicacion = require('./publicacion.model')(sequelize);
const donacion = require('./donacion.model')(sequelize);
const comentario = require('./comentario.model')(sequelize);
const favorito = require('./favorito.model')(sequelize);

usuario.hasOne(perfilCreador, { foreignKey: 'usuarioId', as: 'perfilCreador' });
perfilCreador.belongsTo(usuario, { foreignKey: 'usuarioId', as: 'usuario', onDelete: 'CASCADE' });

perfilCreador.hasMany(metaApoyo, { foreignKey: 'perfilCreadorId', as: 'metas' });
metaApoyo.belongsTo(perfilCreador, { foreignKey: 'perfilCreadorId', as: 'perfilCreador', onDelete: 'CASCADE' });

perfilCreador.hasMany(publicacion, { foreignKey: 'perfilCreadorId', as: 'publicaciones' });
publicacion.belongsTo(perfilCreador, { foreignKey: 'perfilCreadorId', as: 'perfilCreador', onDelete: 'CASCADE' });

usuario.hasMany(donacion, { foreignKey: 'seguidorId', as: 'donacionesRealizadas' });
donacion.belongsTo(usuario, { foreignKey: 'seguidorId', as: 'seguidor', onDelete: 'CASCADE' });
perfilCreador.hasMany(donacion, { foreignKey: 'perfilCreadorId', as: 'donaciones' });
donacion.belongsTo(perfilCreador, { foreignKey: 'perfilCreadorId', as: 'perfilCreador', onDelete: 'CASCADE' });

usuario.hasMany(comentario, { foreignKey: 'seguidorId', as: 'comentariosRealizados' });
comentario.belongsTo(usuario, { foreignKey: 'seguidorId', as: 'seguidor', onDelete: 'CASCADE' });
publicacion.hasMany(comentario, { foreignKey: 'publicacionId', as: 'comentarios' });
comentario.belongsTo(publicacion, { foreignKey: 'publicacionId', as: 'publicacion', onDelete: 'CASCADE' });

usuario.hasMany(favorito, { foreignKey: 'seguidorId', as: 'favoritos' });
favorito.belongsTo(usuario, { foreignKey: 'seguidorId', as: 'seguidor', onDelete: 'CASCADE' });
perfilCreador.hasMany(favorito, { foreignKey: 'perfilCreadorId', as: 'favoritos' });
favorito.belongsTo(perfilCreador, { foreignKey: 'perfilCreadorId', as: 'perfilCreador', onDelete: 'CASCADE' });

module.exports = {
    usuario,
    perfilCreador,
    metaApoyo,
    publicacion,
    donacion,
    comentario,
    favorito,
    sequelize,
    Sequelize: sequelize.Sequelize
}
