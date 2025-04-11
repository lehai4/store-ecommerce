import { apiConnect } from "@/api/apiConnect";
import LayoutAdmin from "@/components/Layout/admin";
import Layout from "@/components/Layout/user";
import { useAppSelector } from "@/hooks/useAppDispatch";
import Admin from "@/Page/admin";
import CategoriesAdmin from "@/Page/admin/categories";
import ProductsAdmin from "@/Page/admin/products";
import UsersAdmin from "@/Page/admin/users";
import Login from "@/Page/Login";
import NotFound from "@/Page/NotFound";
import Home from "@/Page/user/Home";
import Products from "@/Page/user/Products";
import { RootState } from "@/store/store";
import { Role } from "@/types/admin";
import { Button } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { Outlet, Route, Routes, useNavigate } from "react-router-dom";

export function AppRoutes() {
  const { user } = useAppSelector((state: RootState) => state.authen);

  const navigate = useNavigate();

  const [roles, setRoles] = useState<Role[]>([]);
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const ProtectedRoutes = () => {
    if (loading) {
      return <div>Loading...</div>;
    }

    return (
      <>
        {user ? (
          <>
            {roles.find((role) => role._id === user.roleId)?.nameRole ===
            "admin" ? (
              <Outlet />
            ) : (
              <div className="flex flex-col items-center justify-center h-screen gap-5">
                <h1 className="text-4xl font-bold">
                  Bạn không có quyền truy cập
                </h1>
                <Button
                  type="primary"
                  onClick={() => navigate(-1)}
                  icon={<ArrowLeftOutlined />}
                >
                  Quay về trang trước
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-screen gap-5">
            <p className="text-4xl">Vui lòng đăng nhập để truy cập</p>
            <Button type="primary" onClick={() => navigate("/login")}>
              Đăng nhập
            </Button>
          </div>
        )}
      </>
    );
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const [roles] = await Promise.all([apiConnect.getRoles()]);
        const { data } = roles;
        setRoles(data);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  if (error) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="text-2xl font-bold text-red-500">
          <div className="flex flex-row flex-wrap gap-4">
            <div className="text-2xl font-bold text-red-500">
              Lỗi khi tải dữ liệu!
            </div>
            <Button type="primary" onClick={() => window.location.reload()}>
              Tải lại trang
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/login" element={<Login />} />
        {/* Add more routes as needed */}
        <Route path="*" element={<NotFound />} />
      </Route>
      <Route element={<ProtectedRoutes />}>
        <Route path="/admin" element={<LayoutAdmin />}>
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/users" element={<UsersAdmin />} />
          <Route path="/admin/categories" element={<CategoriesAdmin />} />
          <Route path="/admin/products" element={<ProductsAdmin />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Route>
    </Routes>
  );
}
