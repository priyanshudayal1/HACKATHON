import { useNavigate, Outlet } from "react-router-dom";
import { useState } from "react";
import { useLogin } from "../store/useLogin";
import Sidebar from "./dashboard/Sidebar";
import MobileMenuButton from "./dashboard/MobileMenuButton";

const UserDashboardLayout = () => {
  const navigate = useNavigate();
  const { logout } = useLogin();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-gray-900">
      <MobileMenuButton
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />

      <div className="flex">
        <Sidebar
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
          handleLogout={handleLogout}
        />

        <div className="w-full md:ml-64 transition-all duration-300">
          <div className="p-4 md:p-8">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboardLayout;
