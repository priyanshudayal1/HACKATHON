import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/User/Login";
import Register from "./pages/User/Register";
import UserDashboardHome from "./pages/User/UserDashboardHome";
import Profile from "./pages/User/Profile";
import UserDashboardLayout from "./components/UserDashboardLayout";
import BudgetTrip from "./pages/User/Features/BudgetTrip";
import LostAndFound from "./pages/User/Features/LostAndFound";
import TransportGuide from "./pages/User/Features/TransportGuide";
import TravelInsuranceHelper from "./pages/User/Features/TravelInsuranceHelper";
import StateWiseGuidelines from "./pages/User/Features/StateWiseGuidelines";
import TravelSuggestion from "./pages/User/Features/TravelSuggestion";
import CrowdSourcedSafety from "./pages/User/Features/CrowdSourcedSafety";
import SmartTranslation from "./pages/User/Features/SmartTranslation";
import AlertsSystems from "./pages/User/Features/AlertsSystems";
import Settings from "./pages/User/Features/Settings";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      {/* Dashboard Routes */}
      <Route path="/dashboard" element={<UserDashboardLayout />}>
        <Route index element={<UserDashboardHome />} />
        <Route path="budget" element={<BudgetTrip />} />
        <Route path="transport" element={<TransportGuide />} />
        <Route path="profile" element={<Profile />} />
        <Route path="maps" element={<div>Maps Page</div>} />
        <Route path="alerts" element={<div>Alerts Page</div>} />
        <Route path="messages" element={<div>Messages Page</div>} />
        <Route path="notifications" element={<div>Notifications Page</div>} />
        <Route path="settings" element={<Settings />} />
        <Route path="lost-found" element={<LostAndFound />} />
        <Route path="insurance" element={<TravelInsuranceHelper />} />
        <Route path="guidelines" element={<StateWiseGuidelines />} />
        <Route path="travel-suggestions" element={<TravelSuggestion />} />
        <Route path="safety-map" element={<CrowdSourcedSafety />} />
        <Route path="smart-translator" element={<SmartTranslation />} />
        <Route path="weather" element={<AlertsSystems />} />
      </Route>

      <Route path="*" element={<div>404 Not Found</div>} />
    </Routes>
  );
};

export default App;
