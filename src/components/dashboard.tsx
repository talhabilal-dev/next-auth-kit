import React from "react";
import { Search } from "lucide-react";

interface DashboardCardProps {
  title: string;
  index: number;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, index }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 h-48">
      <div className="flex items-center justify-center h-full text-gray-400">
        <div className="text-center">
          <div className="w-12 h-12 bg-gray-100 rounded-lg mx-auto mb-3"></div>
          <p className="text-sm">{title}</p>
        </div>
      </div>
    </div>
  );
};

const Dashboard: React.FC = () => {
  const dashboardCards = [
    "Dashboard Card 1",
    "Dashboard Card 2",
    "Dashboard Card 3",
    "Dashboard Card 4",
    "Dashboard Card 5",
    "Dashboard Card 6",
  ];

  return (
    <div className="flex-1 bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search"
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent w-64"
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dashboardCards.map((title, index) => (
            <DashboardCard key={index} title={title} index={index} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
