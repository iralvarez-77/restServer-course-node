const { Schema, model } = require("mongoose");

const usuarioSchema = Schema({
  name: {
    type: String,
    required: [true, "El nombre es obligatorio"],
  },

  email: {
    type: String,
    required: [true, "El email es obligatorio"],
    unique: true,
  },

  password: {
    type: String,
    required: [true, "La contraseña es obligatoria"],
  },

  img: {
    type: String,
  },

  role: {
    type: String,
    required: true,
    emun: ["ADMIN_ROLE", "USER_ROLE"],
  },

  estado: {
    type: Boolean,
    default: true,
  },

  google: {
    type: Boolean,
    default: false,
  },
});

usuarioSchema.methods.toJSON = function() {
    const {__v, password,...user} = this.toObject();
    return user;
}

module.exports = model("usuario", usuarioSchema);
