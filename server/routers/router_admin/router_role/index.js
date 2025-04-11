const express = require("express");
const router = express.Router();
const controllerRole = require("../../../controllers/controller_admin/controllers_role/index");

router.get("/", controllerRole.getRoles);

module.exports = router;
