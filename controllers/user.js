const { response } = require("express");
const Usuario = require("../models/usuario");
const bCryptJs = require("bcryptjs");

const userGet =  async (req, res) => {
  const {limite = 5, desde = 0}= req.query;
  const query = {estado:true}

  const [totalUsuarios, allUsers] = await Promise.all([
    Usuario.countDocuments(query),
    Usuario.find(query)
      .skip(Number(desde))
      .limit(Number(limite))
  ]);
    
  res.json({
    totalUsuarios,
    allUsers
  });
};

const userPut = async (req, res) => {
  const {id}= req.params;
  const {_id, password, google, email, ...resto } = req.body;

  if (password) {
    //Encriptar la contraseña
    const salt = bCryptJs.genSaltSync();
    resto.password = bCryptJs.hashSync(password, salt);
  }

  const actualizarUsuario = await Usuario.findByIdAndUpdate(id, resto);

  res.json(actualizarUsuario); 
};

const userPost = async (req, res) => {
  const { name, password, email, role } = req.body;
  const usuario = new Usuario({ name, password, email, role });

  //Encriptar la contraseña
  const salt = bCryptJs.genSaltSync();
  usuario.password = bCryptJs.hashSync(password, salt);

  //Guardar en BD
  await usuario.save();

  res.json({
    usuario
  });
};

const userDelete = async ( req, res ) => {
  const{ id } = req.params;

  //Fisicamente lo borramos
  // const userDelete = await Usuario.findByIdAndDelete(id);

  const userInactivo = await Usuario.findByIdAndUpdate( id, { estado: false } )

  res.json( userInactivo );
}; 

const userPatch = (req, res) => {
  res.json({
    msj: "patch API -- controlador",
  });
};

module.exports = {
  userGet,
  userPut,
  userPost,
  userDelete,
  userPatch,
};
