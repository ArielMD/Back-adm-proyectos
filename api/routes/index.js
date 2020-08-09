const { Router } = require("express");
const express = require("express");
const userRoutes = require("./userRoutes");

const router = Router();
const apiRoute = Router();

//middlewares
//apiRoute.use(express.json());

//Routes
apiRoute.use("/users", userRoutes);

//Route Default
router.use("/api", apiRoute);

module.exports = router;
