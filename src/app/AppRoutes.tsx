import {Route, Routes} from "react-router-dom";
import {AppLayout, BootstrapLayout} from "@/app/AppLayout";

import HomePage from "@/pages/Home";
import LoginPage from "@/pages/Login";
import RegisterPage from "@/pages/Register";
import AppBootstrap from "@/pages/AppBootstrap";
import OnboardingPage from "@/pages/Onboarding";
import DashboardPage from "@/pages/Dashboard";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Bootstrap-only (no header/footer) */}
      <Route element={<BootstrapLayout />}>
        <Route path="/app" element={<AppBootstrap />} />
      </Route>

      {/* Public site chrome */}
      <Route element={<AppLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/onboarding" element={<OnboardingPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        {/* /demo, etc */}
      </Route>
    </Routes>
  );
}
