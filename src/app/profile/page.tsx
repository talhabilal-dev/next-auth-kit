import Profile from "@/components/profile";
import Sidebar from "@/components/dashboardSideBar";

const ProfilePage: React.FC = () => {
  return (
    <div className="flex">
      <Sidebar activeItem="Profile" />
      <Profile />
    </div>
  );
};

export default ProfilePage;