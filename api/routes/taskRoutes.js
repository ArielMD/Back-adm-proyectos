const { Router } = require("express");
const { TaskController } = require("../controllers");
const { auth } = require("../../middleware");
const { check } = require("express-validator");

const router = Router();

router.get("/:id", auth, TaskController.getTasks);

router.post(
  "/",
  auth,
  [
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("project", "El projecto es obligatorio").not().isEmpty(),
  ],
  TaskController.createTask
);

router.put("/:id", auth, TaskController.updateTask);

router.delete("/:id/:project", auth, TaskController.deleteTask);

module.exports = router;
