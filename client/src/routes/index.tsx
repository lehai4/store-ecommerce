import { Routes, Route } from "react-router-dom";
import Home from "@/Page/Home";
import Layout from "@/components/Layout";
import Products from "@/Page/Products";
import Admin from "@/Page/Admin";

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        {/* Add more routes as needed */}
      </Route>
      <Route path="/admin" element={<Admin />} />
    </Routes>
  );
}
