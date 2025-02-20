import { Menu, X } from "lucide-react";

const MobileMenuButton = ({ isMobileMenuOpen, setIsMobileMenuOpen }) => {
  return (
    <button
      onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      className="md:hidden fixed top-4 left-4 z-50 p-2 bg-black/20 backdrop-blur-lg rounded-lg text-white"
    >
      {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
    </button>
  );
};

export default MobileMenuButton;
