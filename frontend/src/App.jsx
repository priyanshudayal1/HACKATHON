import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AdminLogin from "./pages/admin/Login";
import Login from "./pages/User/Login";
import Register from "./pages/User/Register";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<div>404 Not Found</div>} />
      <Route path="/admin_login" element={<AdminLogin/>} />
    </Routes>
  );
};

export default App;
