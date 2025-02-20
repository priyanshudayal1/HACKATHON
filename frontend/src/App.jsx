import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AdminLogin from "./pages/admin/Login";
import Login from "./pages/User/Login";
import Register from "./pages/User/Register";
import AdminDashboard from "./pages/Admin/Dashboard";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<div>404 Not Found</div>} />
      <Route path="/admin/login" element={<AdminLogin/>} />
      <Route path="/admin/dashboard" element={<AdminDashboard/>} />
    </Routes>
  );
};

export default App;
