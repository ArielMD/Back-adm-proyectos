const { User } = require("../models");
const { validationResult } = require("express-validator");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { json } = require("express");

class AuthController {
  async login(req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ erros: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ msg: "El usuario no existe" });
      }

      const passwordCorrect = await bcryptjs.compare(password, user.password);

      if (!passwordCorrect) {
        return res.status(400).json({ msg: "Contraseña incorrecta" });
      }

      const payload = {
        user: user.id,
      };

      jwt.sign(
        payload,
        process.env.SECRET_JWT,
        { expiresIn: 3600 },
        (error, token) => {
          if (error) throw error;
          return res.status(200).send({ token });
        }
      );
    } catch (error) {}
  }

  async logout(req, res) {}
}

module.exports = new AuthController();
