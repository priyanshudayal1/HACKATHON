import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/User/Login";
import Register from "./pages/User/Register";
import UserDashboardHome from "./pages/User/UserDashboardHome";
import Profile from "./pages/User/Profile";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<UserDashboardHome />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="*" element={<div>404 Not Found</div>} />
    </Routes>
  );
};

export default App;
