const express = require("express");
const router = express.Router();
const controllerProduct = require("../../../controllers/controller_admin/controller_product/index");

// upload.js
const multer = require("multer");

const upload = multer({ dest: "uploads/" }); // file tạm

router.get("/", controllerProduct.getProducts);
router.post("/", controllerProduct.createProduct);
router.put("/:id", controllerProduct.updateProduct);
router.delete("/:id", controllerProduct.deleteProduct);
router.post("/upload", upload.single("image"), controllerProduct.uploadImage);
module.exports = router;
