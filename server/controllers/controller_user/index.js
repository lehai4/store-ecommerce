const { User } = require("../../models/index");
const bcrypt = require("bcrypt");
const controllerForUser = {
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({
          success: false,
          message: "Email không tồn tại",
        });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      // So sánh mật khẩu đã nhập với mật khẩu đã mã hóa
      if (!isMatch) {
        return res.status(400).json({
          success: false,
          message: "Mật khẩu không chính xác",
        });
      }

      if (!user.status) {
        return res.status(400).json({
          success: false,
          message: "Tài khoản đã bị khóa",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Đăng nhập thành công",
        data: user,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },
};

module.exports = controllerForUser;
