const express = require("express");
const router = express.Router();
const controllerUser = require("../../../controllers/controller_admin/controllers_user");

router.get("/", controllerUser.getUsers);

router.post("/", controllerUser.createUser);

router.put("/:id", controllerUser.updateUser);

router.delete("/:id", controllerUser.deleteUser);

module.exports = router;
