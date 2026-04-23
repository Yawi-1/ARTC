import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { Menu } from "lucide-react";

const Layout = () => {
  const [open, setOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50">
      
      <Sidebar
        open={open}
        setOpen={setOpen}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />

      {/* Main */}
      <div className="flex-1 flex flex-col">
        
        {/* Topbar */}
        <div className="flex items-center justify-between bg-white px-4 py-3 shadow-sm border-b">
          
          <button
            className="md:hidden"
            onClick={() => setOpen(true)}
          >
            <Menu size={22} />
          </button>

          <h1 className="text-lg font-semibold text-gray-700">
            Transport Manager
          </h1>

          <div className="text-sm text-gray-500">
            Admin
          </div>
        </div>

        {/* Content */}
        <div className="p-4 overflow-y-auto flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;