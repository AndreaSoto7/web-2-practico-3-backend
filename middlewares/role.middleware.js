const requireRole = (rol) => {
    return (req, res, next) => {
        if (!req.user || req.user.rol !== rol) {
            return res.status(403).json({ message: "No tienes permisos para acceder a este recurso" });
        }
        next();
    };
};

module.exports = requireRole;
