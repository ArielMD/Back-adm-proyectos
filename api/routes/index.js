const { Router } = require("express");
const express = require("express");
const userRoutes = require("./userRoutes");
const authRoutes = require("./authRoutes");
const projectRoutes = require("./projectRoutes");
const taskRoutes = require("./taskRoutes");

const router = Router();
const apiRoute = Router();

//middlewares
apiRoute.use(express.json());

//Routes
apiRoute.use("/users", userRoutes);
apiRoute.use("/auth", authRoutes);
apiRoute.use("/project", projectRoutes);
apiRoute.use("/tasks", taskRoutes);

//Route Default
router.use("/api", apiRoute);

module.exports = router;
