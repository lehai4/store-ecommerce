const { Category } = require("../../../models/index");

const controllerCategory = {
  getCategories: async (req, res) => {
    try {
      const categories = await Category.find();
      res.status(200).json({
        success: true,
        message: "Lấy danh sách loại danh mục thành công",
        data: categories,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },
  createCategory: async (req, res) => {
    try {
      const category = await Category.create(req.body);
      res.status(200).json({
        success: true,
        message: "Thêm danh mục thành công",
        data: category,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },
  updateCategory: async (req, res) => {
    try {
      const category = await Category.findByIdAndUpdate(
        req.params.id,
        req.body
      );
      res.status(200).json({
        success: true,
        message: "Cập nhật danh mục thành công",
        data: category,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },
  deleteCategory: async (req, res) => {
    try {
      const category = await Category.findByIdAndDelete(req.params.id);
      res.status(200).json({
        success: true,
        message: "Xóa danh mục thành công",
        data: category,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },
};

module.exports = controllerCategory;
