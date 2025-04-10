const { User } = require("../../models/index");

const controllerUser = {
  getUsers: async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).json({
        success: true,
        message: "Lấy danh sách người dùng thành công",
        data: users,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },

  createUser: async (req, res) => {
    try {
      const { name, email, phone, address, roleId } = req.body;
      if (!name || !email || !phone || !address || !roleId) {
        return res.status(400).json({
          success: false,
          message: "Vui lòng nhập đầy đủ thông tin",
        });
      }
      console.log(name, email, phone, address, roleId);
      const user = await User.create({ name, email, phone, address, roleId });
      res.status(200).json({
        success: true,
        message: "Thêm người dùng thành công",
        data: user,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },

  updateUser: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, email, phone, address, roleId, status } = req.body;
      const user = await User.findByIdAndUpdate(id, {
        name,
        email,
        phone,
        address,
        roleId,
        status,
      });
      res.status(200).json({
        success: true,
        message: "Cập nhật người dùng thành công",
        data: user,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },

  deleteUser: async (req, res) => {
    try {
      const { id } = req.params;
      await User.findByIdAndDelete(id);
      res.status(200).json({
        success: true,
        message: "Xóa người dùng thành công",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },
};

module.exports = controllerUser;
