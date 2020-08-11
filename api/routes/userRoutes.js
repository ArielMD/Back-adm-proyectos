const { Router } = require("express");
const { UserController } = require("../controllers");
const { check } = require("express-validator");

const router = Router();

router.post(
  "/",
  check("name", "El nombre es obligatorio").not().isEmpty(),
  check("email", "Ingresa un email valido").isEmail(),
  check("password", "La contraseña debe ser mayor de 5 caracteres").isLength({
    min: 5,
  }),
  UserController.createUser
);

module.exports = router;
