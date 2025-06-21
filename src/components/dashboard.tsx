"use client";
import React from "react";
import { Search, Calendar } from "lucide-react";

import { DashboardCardProps } from "@/types";

const DashboardCard: React.FC<DashboardCardProps> = ({ title, index }) => {
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-700/50 p-4 sm:p-6 hover:bg-gray-800/70 transition-all duration-200">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
            <Calendar className="w-5 h-5 text-purple-300" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-100 truncate">
              {title}
            </h3>
            <p className="text-xs text-gray-400">Data</p>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <div className="text-2xl font-bold text-white">—</div>
        <div className="flex items-center space-x-1">
          <span className="text-sm font-medium text-gray-500">—</span>
          <span className="text-sm text-gray-400">—</span>
        </div>
      </div>
    </div>
  );
};

const Dashboard: React.FC = () => {
  const dashboardCards = [
    "Sample Card 1",
    "Sample Card 2",
    "Sample Card 3",
    "Sample Card 4",
    "Sample Card 5",
    "Sample Card 6",
  ];

  return (
    <div className="flex-1 bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 min-h-screen lg:ml-64 overflow-y-auto">
      <header className="bg-gray-800/30 backdrop-blur-md border-b border-gray-700/50 px-4 sm:px-6 py-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div className="ml-6 sm:ml-12">
            <h1 className="text-xl sm:text-2xl font-bold text-white">
              Dashboard
            </h1>
            <p className="text-sm text-gray-300 mt-1">
              Welcome back! Here's what's happening.
            </p>
          </div>

          <div className="relative hidden sm:block">
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 bg-gray-700/50 border border-gray-600/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 w-48 md:w-64 text-white placeholder-gray-400 backdrop-blur-sm"
            />
          </div>
        </div>

        <div className="relative sm:hidden mt-4">
          <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 bg-gray-700/50 border border-gray-600/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-white placeholder-gray-400 backdrop-blur-sm"
          />
        </div>
      </header>

      <main className="p-4 sm:p-6">
        <div className="mb-6 sm:mb-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="bg-gray-800/40 backdrop-blur-sm rounded-lg p-3 sm:p-4 border border-gray-700/50"
              >
                <div className="text-lg sm:text-xl font-bold text-white">—</div>
                <div className="text-xs sm:text-sm text-gray-300">—</div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {dashboardCards.map((title, index) => (
            <DashboardCard key={index} title={title} index={index} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
