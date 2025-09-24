import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Splash from "@/react-app/pages/Splash";
import OnboardingWelcome from "@/react-app/pages/OnboardingWelcome";
import OnboardingWasteHandover from "@/react-app/pages/OnboardingWasteHandover";
import OnboardingRewards from "@/react-app/pages/OnboardingRewards";
import AuthSelection from "@/react-app/pages/AuthSelection";
import Login from "@/react-app/pages/Login";
import Register from "@/react-app/pages/Register";
import ResetPassword from "@/react-app/pages/ResetPassword";
import OTPVerification from "@/react-app/pages/OTPVerification";
import CreateNewPassword from "@/react-app/pages/CreateNewPassword";
import Dashboard from "@/react-app/pages/Dashboard";
import Notifications from "@/react-app/pages/Notifications";
import News from "@/react-app/pages/News";
import NewsDetail from "@/react-app/pages/NewsDetail";
import WasteScan from "@/react-app/pages/WasteScan";
import GarbageHandover from "@/react-app/pages/GarbageHandover";
import GarbageWelcome from "@/react-app/pages/GarbageWelcome";
import GarbageCamera from "@/react-app/pages/GarbageCamera";
import GarbageConfirmation from "@/react-app/pages/GarbageConfirmation";
import GarbageForm from "@/react-app/pages/GarbageForm";
import GarbageSuccess from "@/react-app/pages/GarbageSuccess";
import Points from "@/react-app/pages/Points";
import PointsRedemption from "@/react-app/pages/PointsRedemption";
import EWalletSelection from "@/react-app/pages/EWalletSelection";
import EWalletConfirmation from "@/react-app/pages/EWalletConfirmation";
import Profile from "@/react-app/pages/Profile";
import EditProfile from "@/react-app/pages/EditProfile";
import Info from "@/react-app/pages/Info";
import History from "@/react-app/pages/History";
import QRScanner from "@/react-app/pages/QRScanner";
import ScanResults from "@/react-app/pages/ScanResults";
import WalletRedemption from "@/react-app/pages/WalletRedemption";
import CreditRedemption from "@/react-app/pages/CreditRedemption";
import TransactionDetail from "@/react-app/pages/TransactionDetail";
import PhoneAuth from "@/react-app/pages/PhoneAuth";
import RoleSelection from "@/react-app/pages/RoleSelection";
import AdminAuth from "@/react-app/pages/AdminAuth";
import AdminLogin from "@/react-app/pages/AdminLogin";
import AdminRegister from "@/react-app/pages/AdminRegister";
import AdminPhoneAuth from "@/react-app/pages/AdminPhoneAuth";
import AdminResetPassword from "@/react-app/pages/AdminResetPassword";
import AdminOTPVerification from "@/react-app/pages/AdminOTPVerification";
import AdminCreateNewPassword from "@/react-app/pages/AdminCreateNewPassword";
import AdminDashboard from "@/react-app/pages/AdminDashboard";
import AdminStaffManagement from "@/react-app/pages/AdminStaffManagement";
import AdminMonitoring from "@/react-app/pages/AdminMonitoring";
import AdminAnalytics from "@/react-app/pages/AdminAnalytics";
import AdminRFIDScanner from "@/react-app/pages/AdminRFIDScanner";
import Settings from "@/react-app/pages/Settings";
import Privacy from "@/react-app/pages/Privacy";
import PickupSchedule from "@/react-app/pages/PickupSchedule";
import PickupScheduleNew from "@/react-app/pages/PickupScheduleNew";
import RouteTracker from "@/react-app/pages/RouteTracker";
import InventoryCheck from "@/react-app/pages/InventoryCheck";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Splash />} />
        <Route path="/onboarding/welcome" element={<OnboardingWelcome />} />
        <Route path="/onboarding/waste-handover" element={<OnboardingWasteHandover />} />
        <Route path="/onboarding/rewards" element={<OnboardingRewards />} />
        <Route path="/role-selection" element={<RoleSelection />} />
        <Route path="/auth-selection" element={<AuthSelection />} />
        <Route path="/login" element={<Login />} />
        <Route path="/phone-auth" element={<PhoneAuth />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/otp-verification" element={<OTPVerification />} />
        <Route path="/create-new-password" element={<CreateNewPassword />} />
        <Route path="/home" element={<Dashboard />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/news" element={<News />} />
        <Route path="/news/:id" element={<NewsDetail />} />
        <Route path="/scan" element={<WasteScan />} />
        <Route path="/garbage-handover" element={<GarbageHandover />} />
        <Route path="/garbage-welcome" element={<GarbageWelcome />} />
        <Route path="/garbage-camera" element={<GarbageCamera />} />
        <Route path="/garbage-confirmation" element={<GarbageConfirmation />} />
        <Route path="/garbage-form" element={<GarbageForm />} />
        <Route path="/garbage-success" element={<GarbageSuccess />} />
        <Route path="/points" element={<Points />} />
        <Route path="/points-redemption" element={<PointsRedemption />} />
        <Route path="/points-redemption/e-wallet" element={<EWalletSelection />} />
        <Route path="/points-redemption/e-wallet/confirmation" element={<EWalletConfirmation />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/info" element={<Info />} />
        <Route path="/history" element={<History />} />
        <Route path="/qr-scanner" element={<QRScanner />} />
        <Route path="/scan-results" element={<ScanResults />} />
        <Route path="/points-redemption/wallet-details" element={<WalletRedemption />} />
        <Route path="/points-redemption/credit" element={<CreditRedemption />} />
        <Route path="/transaction/:id" element={<TransactionDetail />} />
        
        {/* Admin Routes */}
        <Route path="/admin/auth" element={<AdminAuth />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/register" element={<AdminRegister />} />
        <Route path="/admin/phone-auth" element={<AdminPhoneAuth />} />
        <Route path="/admin/reset-password" element={<AdminResetPassword />} />
        <Route path="/admin/otp-verification" element={<AdminOTPVerification />} />
        <Route path="/admin/create-new-password" element={<AdminCreateNewPassword />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/staff-management" element={<AdminStaffManagement />} />
        <Route path="/admin/monitoring" element={<AdminMonitoring />} />
        <Route path="/admin/analytics" element={<AdminAnalytics />} />
        <Route path="/admin/rfid-scanner" element={<AdminRFIDScanner />} />
        
        {/* Settings Routes */}
        <Route path="/settings" element={<Settings />} />
        <Route path="/privacy" element={<Privacy />} />
        
        {/* Pickup Schedule Routes */}
        <Route path="/pickup-schedule" element={<PickupSchedule />} />
        <Route path="/pickup-schedule/new" element={<PickupScheduleNew />} />
        
        {/* Additional Admin Tools */}
        <Route path="/route-tracker" element={<RouteTracker />} />
        <Route path="/inventory-check" element={<InventoryCheck />} />
      </Routes>
    </Router>
  );
}
