const { Role } = require("../../models/index");

const controllerRole = {
  getRoles: async (req, res) => {
    try {
      const roles = await Role.find();
      res.status(200).json({
        success: true,
        message: "Lấy danh sách vai trò thành công",
        data: roles,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },
};

module.exports = controllerRole;
