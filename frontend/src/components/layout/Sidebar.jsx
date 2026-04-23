import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  ArrowLeftRight,
  FileText,
  LogOut,
  ChevronLeft,
  ChevronRight,
  User,
  IndianRupee,
  Award 
} from "lucide-react";


const Sidebar = ({ open, setOpen, collapsed, setCollapsed }) => {
  const menu = [
    { name: "Dashboard", path: "/", icon: <LayoutDashboard size={20} /> },
    { name: "Transactions", path: "/transactions", icon: <ArrowLeftRight size={20} /> },
    { name: "Bills", path: "/bills", icon: <FileText size={20} /> },
    { name: "Payments", path: "/payments", icon: <IndianRupee size={20} />},
    { name: "Clients", path: "/clients", icon: <Award size={20} />},
  ];

  return (
    <>
      {/* Modern Sidebar */}
      <div
        className={`
          fixed md:static top-0 left-0 h-full 
          ${collapsed ? "w-30" : "w-72"} 
          bg-gradient-to-b from-slate-900 to-slate-800
          backdrop-blur-sm
          border-r border-white/10
          shadow-2xl
          transform ${open ? "translate-x-0" : "-translate-x-full"} 
          md:translate-x-0
          transition-all duration-300 ease-in-out
          z-50
          flex flex-col
        `}
      >
        {/* Logo Section - Modern with Glass Effect */}
        <div className="flex items-center justify-between p-5 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 bg-indigo-500/20 rounded-lg blur-lg"></div>
              <img
                src="/logo.png"
                alt="logo"
                className="relative w-9 h-9 rounded-xl object-center shadow-lg ring-2 ring-white/20"
              />
            </div>
            {!collapsed && (
              <div className="overflow-hidden transition-all duration-300">
                <span className="text-xl font-bold bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                Asian Roadways
                </span>
                <p className="text-[11px] text-white/40 font-medium tracking-wide">
                  Transport Company
                </p>
              </div>
            )}
          </div>

          {/* Collapse Toggle - Modern Floating Button */}
          <button
            className="hidden md:flex items-center justify-center w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? (
              <ChevronRight size={16} className="text-white/70" />
            ) : (
              <ChevronLeft size={16} className="text-white/70" />
            )}
          </button>
        </div>

        {/* Navigation Menu - Scrollable */}
        <nav className="flex-1 px-3 py-6 space-y-1.5 overflow-y-auto custom-scrollbar">
          {menu.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) => `
                relative group flex items-center gap-3 px-3 py-2.5 rounded-xl
                transition-all duration-200 ease-out
                ${
                  isActive
                    ? "bg-indigo-600/20 text-indigo-300 shadow-lg shadow-indigo-500/10"
                    : "text-white/70 hover:text-white hover:bg-white/10"
                }
                ${collapsed ? "justify-center" : "justify-start"}
              `}
              onClick={() => setOpen(false)}
            >
              {/* Active Indicator Line */}
              {({ isActive }) => isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-indigo-500 rounded-r-full shadow-lg shadow-indigo-500/50" />
              )}
              
              <span className="transition-transform duration-200 group-hover:scale-105">
                {item.icon}
              </span>
              
              {!collapsed && (
                <span className="text-sm font-medium tracking-wide">{item.name}</span>
              )}
              
              {/* Tooltip for Collapsed Mode */}
              {collapsed && (
                <div className="absolute left-full ml-3 px-2.5 py-1.5 bg-slate-800 text-white text-xs font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none whitespace-nowrap z-50 shadow-xl border border-white/10 backdrop-blur-sm">
                  {item.name}
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 -ml-1 w-1.5 h-1.5 bg-slate-800 rotate-45 border-l border-t border-white/10"></div>
                </div>
              )}
            </NavLink>
          ))}
        </nav>

        {/* User Profile & Logout Section */}
        <div className="p-4 border-t border-white/10 bg-gradient-to-t from-black/10 to-transparent">
          {/* User Profile Card */}
          <div className="flex items-center gap-3 mb-4 p-2 rounded-xl bg-white/5 backdrop-blur-sm">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg">
                <User size={18} className="text-white" />
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full ring-2 ring-slate-900"></div>
            </div>
            {!collapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white truncate">Alex Morgan</p>
                <p className="text-xs text-white/40 truncate">Operations Manager</p>
              </div>
            )}
         
          </div>

          {/* Logout Button */}
          <button className="relative group flex items-center gap-3 w-full px-3 py-2.5 rounded-xl transition-all duration-200 hover:bg-red-500/10 text-white/70 hover:text-red-400">
            <LogOut size={18} className="transition-transform duration-200 group-hover:translate-x-0.5" />
            {!collapsed && (
              <span className="text-sm font-medium">Logout</span>
            )}
            {collapsed && (
              <div className="absolute left-full ml-3 px-2.5 py-1.5 bg-red-500/90 text-white text-xs font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none whitespace-nowrap z-50 shadow-xl">
                Logout
                <div className="absolute left-0 top-1/2 -translate-y-1/2 -ml-1 w-1.5 h-1.5 bg-red-500/90 rotate-45"></div>
              </div>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Overlay - Improved with Blur */}
      {open && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm md:hidden animate-in fade-in duration-300 z-40"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.3);
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </>
  );
};

export default Sidebar;