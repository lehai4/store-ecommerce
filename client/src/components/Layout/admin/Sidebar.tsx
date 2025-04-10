import { Divider } from "antd";
import { Link } from "react-router-dom";
import {
  ProductOutlined,
  OrderedListOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useLocation } from "react-router-dom";
const Sidebar = () => {
  const location = useLocation();
  return (
    <div className="flex flex-col gap-4">
      <div className="h-16">
        <div className="flex justify-center items-center gap-2 h-full">
          <h1 className="text-2xl font-bold">SoaFStore</h1>
        </div>
        <Divider className="!my-0" />
      </div>
      <ul className="flex flex-col gap-1">
        <li>
          <Link
            to="/admin/products"
            className={`flex items-center gap-2 text-lg px-5 py-3 hover:bg-gray-300 ${
              location.pathname === "/admin/products" ? "bg-gray-300" : ""
            }`}
          >
            <ProductOutlined />
            <span>Product</span>
          </Link>
        </li>
        <li>
          <Link
            to="/admin/categories"
            className={`flex items-center gap-2 text-lg px-5 py-3 hover:bg-gray-300 ${
              location.pathname === "/admin/categories" ? "bg-gray-300" : ""
            }`}
          >
            <OrderedListOutlined />
            <span>Category</span>
          </Link>
        </li>
        <li>
          <Link
            to="/admin/users"
            className={`flex items-center gap-2 text-lg px-5 py-3 hover:bg-gray-300 ${
              location.pathname === "/admin/users" ? "bg-gray-300" : ""
            }`}
          >
            <UserOutlined />
            <span>User</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
