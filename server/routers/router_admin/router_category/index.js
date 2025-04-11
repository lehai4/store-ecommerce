const express = require("express");
const router = express.Router();
const controllerCategory = require("../../../controllers/controller_admin/controller_category/index");

router.get("/", controllerCategory.getCategories);
router.post("/", controllerCategory.createCategory);
router.put("/:id", controllerCategory.updateCategory);
router.delete("/:id", controllerCategory.deleteCategory);
module.exports = router;
