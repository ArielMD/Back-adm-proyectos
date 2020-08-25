const { Router } = require("express");
const { ProjectController } = require("../controllers");
const { auth } = require("../../middleware");
const { check } = require("express-validator");

const router = Router();

router.post(
  "/",
  auth,
  [check("name", "El nombre del proyecto no debe estar vacio").not().isEmpty()],
  ProjectController.createProject
);

router.get("/", auth, ProjectController.getProjects);

router.put(
  "/:id",
  auth,
  [check("name", "El nombre del proyecto no debe estar vacio").not().isEmpty()],
  ProjectController.updateProject
);

module.exports = router;
