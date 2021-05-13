const Role = require("../models/role");
const Usuario = require("../models/usuario");

const isRoleValido = async (role = "") => {
  const existeRol = await Role.findOne({ role });
  if (!existeRol) {
    throw new Error(`El role ${role} no está registrado en la BD`);
  }
};

const emailExiste = async (email) => {
  const ifEmailExists = await Usuario.findOne({ email });

  if (ifEmailExists) {
    throw new Error(`El email:'${email}' ya está registrado`);
  }
};

const existeUsuarioId= async (id) => {
  const ifExisteActualizarUsuario = await Usuario.findById(id);

  if (!ifExisteActualizarUsuario) {
    throw new Error(`El id:'${id}' no existe`);
  }
};

module.exports = {
  isRoleValido,
  emailExiste,
  existeUsuarioId
};
