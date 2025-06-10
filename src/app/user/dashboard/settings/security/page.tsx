import Appearance from "@/components/security";
import Sidebar from "@/components/dashboardSideBar";

const AppearancePage: React.FC = () => {
  return (
    <div className="flex">
      <Sidebar activeItem="Security" />
      <Appearance />
    </div>
  );
};

export default AppearancePage;