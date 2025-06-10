import React from 'react';
import Sidebar from '@/components/dashboardSideBar';
import Settings from '@/components/setting';

const SettingsPage: React.FC = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar activeItem="Settings" />
      <Settings />
    </div>
  );
};

export default SettingsPage;


