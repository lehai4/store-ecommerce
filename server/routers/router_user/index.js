const express = require("express");
const router = express.Router();
const controllerForUser = require("../../controllers/controller_user");

router.post("/login", controllerForUser.login);
router.post("/register", controllerForUser.register);
module.exports = router;
