module.exports = app => {
    require('./auth.routes')(app);
    require('./creador.routes')(app);
    require('./meta.routes')(app);
    require('./publicacion.routes')(app);
    require('./donacion.routes')(app);
    require('./favorito.routes')(app);

    // Rutas del frontend React: pendientes para la siguiente etapa del practico.
}
