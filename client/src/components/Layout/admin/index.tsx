import { useState } from "react";
import { Outlet } from "react-router-dom";
import FooterAdmin from "./FooterAdmin";
import HeaderAdmin from "./HeaderAdmin";
import Sidebar from "./Sidebar";
const LayoutAdmin = () => {
  const [isSidebarVisible, setSidebarVisible] = useState(true);

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  return (
    <div className="flex min-h-screen">
      <aside
        className={`bg-gray-200 transition-all duration-300 ${
          isSidebarVisible ? "w-64" : "w-0 overflow-hidden"
        }`}
      >
        <nav className={`${isSidebarVisible ? "block" : "hidden"}`}>
          <Sidebar />
        </nav>
      </aside>
      <div
        className={`flex flex-col transition-all duration-300 ${
          isSidebarVisible ? "flex-grow w-[calc(100%-256px)]" : "w-full"
        }`}
      >
        <HeaderAdmin onToggleSidebar={toggleSidebar} />
        <main
          className="flex-grow p-4 overflow-y-auto "
          style={{ height: "calc(100vh - 64px - 64px)" }}
        >
          <Outlet />
        </main>
        <FooterAdmin />
      </div>
    </div>
  );
};

export default LayoutAdmin;
