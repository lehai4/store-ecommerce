const mongoose = require("mongoose");

// Schema cho NhanVien
const userSchema = new mongoose.Schema(
  {
    name: String,
    password: String,
    email: String,
    phone: String,
    address: String,
    status: { type: Boolean, default: true },
    roleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "sync_roles",
      default: "67f74338b483b59009dea28a",
    },
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
    description: String,
  },
  { timestamps: true }
);

const productSchema = new mongoose.Schema(
  {
    IDProduct: String,
    nameProduct: String,
    IDCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "sync_categories",
    },
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
const Category = mongoose.model("sync_categories", categorySchema);
const Product = mongoose.model("sync_products", productSchema);

module.exports = {
  User,
  Role,
  Category,
  Product,
};
