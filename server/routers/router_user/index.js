const express = require("express");
const router = express.Router();
const controllerForUser = require("../../controllers/controller_user");

router.post("/login", controllerForUser.login);

module.exports = router;
