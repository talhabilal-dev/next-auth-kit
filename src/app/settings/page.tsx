import React from 'react';
import Sidebar from '@/components/dashboardSideBar';
import Settings from '@/components/ui/setting';

const SettingsPage: React.FC = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activeItem="Settings" />
      <Settings />
    </div>
  );
};

export default SettingsPage;


