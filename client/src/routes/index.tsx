import { Routes, Route } from "react-router-dom";
import Home from "@/Page/Home";
import Layout from "@/components/Layout/user";
import Products from "@/Page/Products";
import NotFound from "@/Page/NotFound";
import LayoutAdmin from "@/components/Layout/admin";
import Admin from "@/Page/admin";
import UsersAdmin from "@/Page/admin/users";
import CategoriesAdmin from "@/Page/admin/categories";
export function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        {/* Add more routes as needed */}
        <Route path="*" element={<NotFound />} />
      </Route>
      <Route path="/admin" element={<LayoutAdmin />}>
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/users" element={<UsersAdmin />} />
        <Route path="/admin/categories" element={<CategoriesAdmin />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
