const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.header("x-auth-token");

  if (!token) {
    res.status(401).json({ msg: "No hay token, permiso invalido" });
  }

  try {
    const data = jwt.verify(token, process.env.SECRET_JWT);
    req.user = data.user;
    next();
  } catch (error) {
    res.status(401).json({ msg: "token invalido" });
  }
};
