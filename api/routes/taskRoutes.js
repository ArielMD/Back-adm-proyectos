const { Router } = require("express");
const { TaskController } = require("../controllers");
const { auth } = require("../../middleware");
const { check } = require("express-validator");

const router = Router();

router.get();

router.post();

router.delete();

router.put();

module.exports = router;
