const { Product } = require("../../../models/index");
const cloudinary = require("../../../config/cloudinary");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");

const controllerProduct = {
  getProducts: async (req, res) => {
    try {
      const products = await Product.find();
      res.status(200).json({
        success: true,
        message: "Lấy danh sách sản phẩm thành công",
        data: products,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },
  createProduct: async (req, res) => {
    try {
      const product = await Product.create(req.body);
      res.status(200).json({
        success: true,
        message: "Thêm sản phẩm thành công",
        data: product,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },
  updateProduct: async (req, res) => {
    try {
      const product = await Product.findByIdAndUpdate(req.params.id, req.body);
      res.status(200).json({
        success: true,
        message: "Cập nhật sản phẩm thành công",
        data: product,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },
  deleteProduct: async (req, res) => {
    try {
      const product = await Product.findByIdAndDelete(req.params.id);
      res.status(200).json({
        success: true,
        message: "Xóa sản phẩm thành công",
        data: product,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },
  uploadImage: async (req, res) => {
    try {
      const result = await cloudinary.uploader.upload(req.file.path, {
        public_id: uuidv4(),
        folder: "products",
      });

      fs.unlinkSync(req.file.path);

      const imageUrl = result.secure_url;

      // Lưu imageUrl vào database như bình thường
      await Product.findByIdAndUpdate(req.body.id, { image: imageUrl });

      res.status(200).json({
        success: true,
        message: "Tải ảnh thành công",
        data: imageUrl,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },
};

module.exports = controllerProduct;
