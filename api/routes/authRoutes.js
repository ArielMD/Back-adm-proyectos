const { Router } = require("express");
const { AuthController } = require("../controllers");
const { check } = require("express-validator");

const router = Router();

router.post(
  "/login",
  check("email", "Ingresa un email valido").isEmail(),
  check("password", "La contraseña debe ser mayor de 5 caracteres").isLength({
    min: 5,
  }),
  AuthController.login
);

module.exports = router;
