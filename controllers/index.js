const models = require("../database/models");

const createUser = async (req, res) => {
    try {
        const user = await models.User.create(req.body);
        return res.status(201).json({ user });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const getAllUsers = async (req, res) => {
    console.log('getting users');
    try {
        const users = await models.User.findAll({
            include: []
        });
        return res.status(200).json({ users });
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

// Función para actualizar un usuario
const updateUser = async (req, res) => {
    try {
        const { id } = req.params; // Obtener el ID del usuario desde los parámetros de la URL
        const { name, email, age, comments } = req.body; // Obtener los datos del cuerpo de la solicitud

        // Buscar el usuario en la base de datos
        const user = await models.User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Actualizar los datos del usuario
        const updatedUser = await user.update({ name, email, age, comments });

        return res.status(200).json({ updatedUser });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// Función para eliminar un usuario
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params; // Obtener el ID del usuario desde los parámetros de la URL

        // Buscar el usuario en la base de datos
        const user = await models.User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Eliminar el usuario de la base de datos
        await user.destroy();

        return res.status(200).json({ message: 'Usuario eliminado correctamente' });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createUser,
    getAllUsers,
    updateUser, // Agregar esta función a los exportadores
    deleteUser  // Agregar esta función a los exportadores
};
