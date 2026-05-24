const { generateToken } = require("../utils/jwt.utils");
const { sha1Encode } = require("../utils/text.utils");
const userService = require("../services/user.service");

exports.postRegister = async (req, res) => {
    const { email, password, rol } = req.body;
    const existingUser = await userService.findUserByEmail(email);
    if (existingUser) {
        return res.status(400).json({ message: "El correo electronico ya esta registrado" });
    }
    const encodedPassword = sha1Encode(password);
    const usuario = await userService.createUser(email, encodedPassword, rol);
    res.status(201).json({ message: "Usuario registrado exitosamente", usuario });
};

exports.postLogin = async (req, res) => {
    const { email, password } = req.body;
    const usuario = await userService.findUserByEmail(email);
    if (!usuario) {
        return res.status(401).json({ message: "Usuario o contrasena incorrectas" });
    }
    const encodedPassword = sha1Encode(password);

    if (encodedPassword !== usuario.password) {
        return res.status(401).json({ message: "Usuario o contrasena incorrectas" });
    }
    const token = generateToken({
        id: usuario.id,
        rol: usuario.rol,
    });
    res.status(200).json({ token });
};

exports.putUserUpdate = async (req, res) => {
    const { id } = req.params;
    await userService.updateObject(id, req.body.email);
    res.json(await userService.getById(id));
};

exports.deleteUser = async (req, res) => {
    const { id } = req.params;
    const user = await userService.deleteObject(id);
    res.json(user);
};

exports.me = async (req, res) => {
    res.json(req.user);
};

exports.logout = async (req, res) => {
    res.json({ message: "Sesion cerrada correctamente. El cliente debe descartar el token." });
};
