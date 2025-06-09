import React from "react";
import { Search, BarChart3, Users, ShoppingCart, TrendingUp, Calendar, Bell } from "lucide-react";

interface DashboardCardProps {
  title: string;
  index: number;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, index }) => {
  // Different icons for variety
  const icons = [BarChart3, Users, ShoppingCart, TrendingUp, Calendar, Bell];
  const Icon = icons[index % icons.length];
  
  // Sample data for demonstration
  const cardData = [
    { value: "$12,345", change: "+12%", color: "text-green-600" },
    { value: "1,234", change: "+8%", color: "text-blue-600" },
    { value: "856", change: "-3%", color: "text-red-600" },
    { value: "$8,923", change: "+15%", color: "text-green-600" },
    { value: "45", change: "+5%", color: "text-purple-600" },
    { value: "23", change: "+2%", color: "text-yellow-600" },
  ];
  
  const data = cardData[index % cardData.length];
  
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
            <Icon className="w-5 h-5 text-gray-600" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-900 truncate">{title}</h3>
            <p className="text-xs text-gray-500">Last 30 days</p>
          </div>
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="text-2xl font-bold text-gray-900">{data.value}</div>
        <div className="flex items-center space-x-1">
          <span className={`text-sm font-medium ${data.color}`}>{data.change}</span>
          <span className="text-sm text-gray-500">vs last month</span>
        </div>
      </div>
    </div>
  );
};

const Dashboard: React.FC = () => {
  const dashboardCards = [
    "Total Revenue",
    "Active Users", 
    "Orders",
    "Sales",
    "Events",
    "Notifications",
  ];

  return (
    <div className="flex-1 bg-gray-50 min-h-screen lg:ml-64 overflow-y-auto">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div className="ml-12 sm:ml-0">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-sm text-gray-500 mt-1">Welcome back! Here's what's happening.</p>
          </div>
          
          {/* Search - Hidden on very small screens, shown from sm up */}
          <div className="relative hidden sm:block">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent w-48 md:w-64"
            />
          </div>
        </div>
        
        {/* Mobile search - Shown only on very small screens */}
        <div className="relative sm:hidden mt-4">
          <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
      </header>

      {/* Main Content */}
      <main className="p-4 sm:p-6">
        {/* Quick Stats Summary - Mobile friendly */}
        <div className="mb-6 sm:mb-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-lg p-3 sm:p-4 border border-gray-200">
              <div className="text-lg sm:text-xl font-bold text-gray-900">$24.5K</div>
              <div className="text-xs sm:text-sm text-gray-500">Total Sales</div>
            </div>
            <div className="bg-white rounded-lg p-3 sm:p-4 border border-gray-200">
              <div className="text-lg sm:text-xl font-bold text-gray-900">2.4K</div>
              <div className="text-xs sm:text-sm text-gray-500">New Users</div>
            </div>
            <div className="bg-white rounded-lg p-3 sm:p-4 border border-gray-200">
              <div className="text-lg sm:text-xl font-bold text-gray-900">345</div>
              <div className="text-xs sm:text-sm text-gray-500">Orders</div>
            </div>
            <div className="bg-white rounded-lg p-3 sm:p-4 border border-gray-200">
              <div className="text-lg sm:text-xl font-bold text-gray-900">98.5%</div>
              <div className="text-xs sm:text-sm text-gray-500">Uptime</div>
            </div>
          </div>
        </div>

        {/* Dashboard Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {dashboardCards.map((title, index) => (
            <DashboardCard key={index} title={title} index={index} />
          ))}
        </div>

        {/* Additional Content Section */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activity */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
            <div className="space-y-3">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <div className="w-3 h-3 bg-purple-600 rounded-full"></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      New order received
                    </p>
                    <p className="text-xs text-gray-500">2 minutes ago</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-3">
              <button className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="text-sm font-medium text-gray-900">Add User</div>
              </button>
              <button className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="text-sm font-medium text-gray-900">New Order</div>
              </button>
              <button className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="text-sm font-medium text-gray-900">Generate Report</div>
              </button>
              <button className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="text-sm font-medium text-gray-900">Settings</div>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;