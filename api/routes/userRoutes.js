const { Router } = require("express");
const { UserController } = require("../controllers");

const router = Router();

router.get("/", UserController.getUsers);
router.post("/", UserController.postUser);
router.delete("/", UserController.deleteUser);

module.exports = router;
