const express = require("express");
const router = express.Router();
const controllerRole = require("../../controllers/controllers_role/index");

router.get("/", controllerRole.getRoles);

module.exports = router;
