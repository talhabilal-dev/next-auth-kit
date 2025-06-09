import React from "react";

import Sidebar from "@/components/dashboardSideBar";
import Dashboard from "@/components/dashboard";

const Page: React.FC = () => {
  return (
    <div className="flex h-auto bg-gray-50">
      <Sidebar activeItem="Dashboard" />
      <Dashboard />
    </div>
  );
};

export default Page;