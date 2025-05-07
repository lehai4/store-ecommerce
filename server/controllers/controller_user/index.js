const { User, Product } = require("../../models/index");
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

      const userData = {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        roleId: user.roleId,
        status: user.status,
      };

      return res.status(200).json({
        success: true,
        message: "Đăng nhập thành công",
        data: userData,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },
  register: async (req, res) => {
    try {
      const { name, email, password, phone, address } = req.body;
      const user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({
          success: false,
          message: "Email đã tồn tại",
        });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        name,
        email,
        password: hashedPassword,
        phone,
        address,
      });
      await newUser.save();
      return res.status(200).json({
        success: true,
        message: "Đăng ký thành công",
        data: newUser,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },

  // Top Deals
  getTopDeals: async (req, res) => {
    try {
      const { type, page = 1, limit = 10 } = req.query;

      const query = type ? { type: type.toLowerCase() } : {};

      const skip = (parseInt(page) - 1) * parseInt(limit);

      const [topDeals, totalItems] = await Promise.all([
        Product.find(query).skip(skip).limit(parseInt(limit)),
        Product.countDocuments(query),
      ]);

      res.status(200).json({
        success: true,
        data: topDeals,
        pagination: {
          totalItems,
          currentPage: parseInt(page),
          totalPages: Math.ceil(totalItems / parseInt(limit)),
          limit: parseInt(limit),
        },
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
