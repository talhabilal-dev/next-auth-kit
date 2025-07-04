"use client";
import React, { useEffect, useState } from "react";
import {
  Home,
  Settings,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  User,
  Shield,
  LogOut
} from "lucide-react";

import Link from "next/link";

import { SidebarUser ,SidebarSubMenuItem , SidebarMenuItem ,SidebarProps } from "@/types";

const Sidebar: React.FC<SidebarProps> = ({ activeItem = "Dashboard" }) => {
  const [user, setUser] = useState<SidebarUser | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const menuItems: SidebarMenuItem[] = [
    { name: "Dashboard", icon: Home, href: "/user/dashboard" },
    {
      name: "Settings",
      icon: Settings,
      submenu: [
        {
          name: "Security",
          icon: Shield,
          href: "/user/dashboard/settings/security",
        },
      ],
    },
  ];

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/users/logout", {
        method: "POST",
      });

      if (!res.ok) {
        throw new Error("Logout failed");
      }

      // Optional: clear local user state or redirect
      window.location.href = "/user/login"; // or push with router
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("/api/users/profile");
        const data = await response.json();

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        setUser({
          username: data.user.username,
          email: data.user.email,
          initials: data.user.username?.charAt(0).toUpperCase() || "U",
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const toggleSettings = () => {
    setSettingsOpen(!settingsOpen);
  };

  const isSettingsActive = (item: SidebarMenuItem): boolean => {
    if (item.submenu) {
      return (
        item.submenu.some((subItem) => subItem.name === activeItem) ||
        item.name === activeItem
      );
    }
    return item.name === activeItem;
  };

  return (
    <>
      {/* Mobile hamburger button */}
      <button
        onClick={toggleMobileMenu}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-gray-800/80 backdrop-blur-sm rounded-lg shadow-lg border border-gray-700/50"
        aria-label="Toggle menu"
      >
        {isMobileMenuOpen ? (
          <X className="w-6 h-6 text-gray-200" />
        ) : (
          <Menu className="w-6 h-6 text-gray-200" />
        )}
      </button>

      {/* Mobile backdrop */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={closeMobileMenu}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 h-screen border-r border-gray-700/50 flex flex-col transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
        } backdrop-blur-xl`}
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-700/50">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-violet-600 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-lg">
              D
            </div>
            <h1 className="text-xl font-bold text-white ">Dashboard</h1>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <ul className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = isSettingsActive(item);

              if (item.submenu) {
                return (
                  <li key={item.name}>
                    <button
                      onClick={toggleSettings}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 group ${
                        isActive
                          ? "bg-purple-500/20 text-purple-300 border border-purple-500/30 shadow-lg shadow-purple-500/10"
                          : "text-gray-300 hover:bg-gray-700/50 hover:text-white hover:shadow-md"
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <Icon
                          className={`w-5 h-5 ${isActive ? "text-purple-300" : "text-gray-400 group-hover:text-gray-200"}`}
                        />
                        <span>{item.name}</span>
                      </div>
                      {settingsOpen ? (
                        <ChevronDown
                          className={`w-4 h-4 ${isActive ? "text-purple-300" : "text-gray-400 group-hover:text-gray-200"}`}
                        />
                      ) : (
                        <ChevronRight
                          className={`w-4 h-4 ${isActive ? "text-purple-300" : "text-gray-400 group-hover:text-gray-200"}`}
                        />
                      )}
                    </button>

                    {/* Submenu */}
                    <div
                      className={`overflow-hidden transition-all duration-300 ease-in-out ${
                        settingsOpen
                          ? "max-h-40 opacity-100"
                          : "max-h-0 opacity-0"
                      }`}
                    >
                      <ul className="mt-1 ml-4 space-y-1">
                        {item.submenu.map((subItem) => {
                          const SubIcon = subItem.icon;
                          const isSubActive = subItem.name === activeItem;
                          return (
                            <li key={subItem.name}>
                              <Link
                                href={subItem.href}
                                onClick={closeMobileMenu}
                                className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 group ${
                                  isSubActive
                                    ? "bg-purple-500/20 text-purple-300 border border-purple-500/30 shadow-lg shadow-purple-500/10"
                                    : "text-gray-400 hover:bg-gray-700/50 hover:text-white hover:shadow-md"
                                }`}
                              >
                                <SubIcon
                                  className={`w-4 h-4 ${isSubActive ? "text-purple-300" : "text-gray-500 group-hover:text-gray-300"}`}
                                />
                                <span>{subItem.name}</span>
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </li>
                );
              }

              return (
                <li key={item.name}>
                  <Link
                    href={item.href || "#"}
                    onClick={closeMobileMenu}
                    className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 group ${
                      isActive
                        ? "bg-purple-500/20 text-purple-300 border border-purple-500/30 shadow-lg shadow-purple-500/10"
                        : "text-gray-300 hover:bg-gray-700/50 hover:text-white hover:shadow-md"
                    }`}
                  >
                    <Icon
                      className={`w-5 h-5 ${isActive ? "text-purple-300" : "text-gray-400 group-hover:text-gray-200"}`}
                    />
                    <span>{item.name}</span>
                  </Link>
                </li>
              );
            })}

            <li>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-4 px-3 py-2 gap-2 rounded-lg text-sm font-medium transition-all cursor-pointer  duration-200 group text-gray-300 hover:bg-red-700/50 hover:text-white hover:shadow-md"
              >
                <LogOut className="w-5 h-5 text-purple-300"></LogOut>
                Logout
              </button>
            </li>
          </ul>
        </nav>

        {/* User Profile */}
        {user && (
          <div className="p-4 border-t border-gray-700/50 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 backdrop-blur-md">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-800/60 hover:bg-gray-700/40 transition-colorsshadow-inner">
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.username}
                  className="w-11 h-11 rounded-full object-cover border-2 border-purple-500/40 shadow"
                />
              ) : (
                <div className="w-11 h-11 bg-gradient-to-br from-purple-500 to-violet-600 rounded-full flex items-center justify-center text-white text-lg font-semibold shadow">
                  {user.initials}
                </div>
              )}
              <div className="flex flex-col min-w-0">
                <span className="text-base font-semibold text-white truncate">
                  {user.username}
                </span>
                <span className="text-xs text-gray-400 truncate">
                  {user.email}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Sidebar;
