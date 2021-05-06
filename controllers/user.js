const { response } = require("express");

const userGet = (req, res) => {
  res.json({
    msj: "get API -- controlador",
  });
};

const userPut = (req, res) => {
  res.json({
    msj: "put API -- controlador",
  });
};

const userPost = (req, res) => {
  res.json({
    msj: "post API -- controlador",
  });
};

const userDelete = (req, res) => {
  res.json({
    msj: "delete API -- controlador",
  });
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
