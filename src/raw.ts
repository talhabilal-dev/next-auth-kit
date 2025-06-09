"use client";

import React, { useEffect, useState } from "react";
import {
  Home,
  BarChart3,
  Folder,
  ClipboardList,
  Calendar,
  MessageSquare,
  Settings,
} from "lucide-react";

interface User {
  username: string;
  email: string;
  avatar?: string;
  initials?: string;
}
interface MenuItem {
  name: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  href?: string;
}

interface SidebarProps {
  activeItem?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ activeItem = "Dashboard" }) => {
  const [user, setUser] = useState<User | null>(null);

  const menuItems: MenuItem[] = [
    { name: "Dashboard", icon: Home, href: "/" },
    { name: "Settings", icon: Settings, href: "/settings" },
  ];

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("/api/users/profile");

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const data = await response.json();
        setUser({
          username: data.user.username,
          email: data.user.email,
          avatar: data.user.avatar || "",
          initials: data.user.username?.charAt(0).toUpperCase() || "U",
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, []);