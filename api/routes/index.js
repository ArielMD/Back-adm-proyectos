const { Router } = require("express");
const express = require("express");
const userRoutes = require("./userRoutes");
const authRoutes = require("./authRoutes");

const router = Router();
const apiRoute = Router();

//middlewares
apiRoute.use(express.json());

//Routes
apiRoute.use("/users", userRoutes);
apiRoute.use("/auth", authRoutes);

//Route Default
router.use("/api", apiRoute);

module.exports = router;
