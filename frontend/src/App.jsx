import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AdminLogin from "./pages/admin/Login";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<div>404 Not Found</div>} />
      <Route path="/admin_login" element={<AdminLogin/>} />
    </Routes>
  );
};

export default App;
