const { User } = require("../models");
const { validationResult } = require("express-validator");
const e = require("express");

class UserController {
  async createUser(req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ erros: errors.array() });
    }

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).send({ message: "usuario ya existe" });
    }

    try {
      const newUser = new User(req.body);
      await newUser.save();

      return res.status(200).send({ message: "Usuario Creado" });
    } catch (error) {
      console.log(error);
      return res.status(400).send({ message: "hubo un error" });
    }
  }
}

module.exports = new UserController();
