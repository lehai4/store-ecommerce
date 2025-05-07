const express = require("express");
const router = express.Router();
const controllerForUser = require("../../controllers/controller_user");

router.post("/login", controllerForUser.login);
router.post("/register", controllerForUser.register);

// Top Deals
router.get("/top-deals", controllerForUser.getTopDeals);

module.exports = router;
