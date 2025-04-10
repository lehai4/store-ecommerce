const mongoose = require("mongoose");

// Schema cho NhanVien
const userSchema = new mongoose.Schema(
  {
    name: String,
    password: { type: String },
    email: String,
    phone: String,
    address: String,
    status: { type: Boolean, default: true },
    roleId: { type: mongoose.Schema.Types.ObjectId, ref: "sync_roles" },
  },
  { timestamps: true }
);

// Schema cho Roles
const roleSchema = new mongoose.Schema(
  {
    IDRole: String,
    nameRole: String,
  },
  { timestamps: true }
);

const categorySchema = new mongoose.Schema(
  {
    IDCategory: String,
    nameCategory: String,
  },
  { timestamps: true }
);

const productSchema = new mongoose.Schema(
  {
    IDProduct: String,
    nameProduct: String,
    IDCategory: String,
    price: Number,
    color: String,
    size: String,
    quantity: Number,
    image: String,
    description: String,
    status: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// Tạo models
const User = mongoose.model("sync_users", userSchema);
const Role = mongoose.model("sync_roles", roleSchema);
const Category = mongoose.model("sync_categorys", categorySchema);
const Product = mongoose.model("sync_products", productSchema);

module.exports = {
  User,
  Role,
  Category,
  Product,
};
