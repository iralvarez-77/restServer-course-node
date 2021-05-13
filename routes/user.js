const { Router } = require("express");
const { check } = require("express-validator");
const router = Router();
const { validarCampos } = require("../middlewares/validar-campos");
const {
  isRoleValido,
  emailExiste,
  existeUsuarioId,
} = require("../hellpers/db-validators");

const {
  userGet,
  userPost,
  userPut,
  userDelete,
  userPatch,
} = require("../controllers/user");

const { Error } = require("mongoose");

router.get("/", userGet);

router.post(
  "/",
  [
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("password", "El password debe tener mas de 6 caracteres").isLength({
      min: 6,
    }),
    check("email", "Este correo no es válido").isEmail(),
    check("email").custom(emailExiste),
    //  check('role', 'No es un role válido').isIn(['ADMIN_ROLE','USER_ROLE']),
    check("role").custom(isRoleValido),
    validarCampos,
  ],
  userPost
);

router.put(
  "/:id",
  [
    check("id", "Este ID no es válido").isMongoId(),
    check("id").custom(existeUsuarioId),
    check("role").custom(isRoleValido),
    validarCampos,
  ],
  userPut
);

router.delete("/:id", [
  check("id", "Este ID no es válido").isMongoId(),
  check("id").custom(existeUsuarioId),
  validarCampos
], userDelete);

router.patch("/", userPatch);

module.exports = router;
