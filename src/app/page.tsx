import React from "react";

import Sidebar from "@/components/dashboardSideBar";
import Dashboard from "@/components/dashboard";

const Home: React.FC = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activeItem="Dashboard" />
      <Dashboard />
    </div>
  );
};

export default Home;
