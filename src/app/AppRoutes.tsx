import { Route, Routes } from "react-router-dom"
import { AppLayout, BootstrapLayout } from "@/app/AppLayout"

import HomeGate from "@/pages/HomeGate"
import LoginPage from "@/pages/Login"
import RegisterPage from "@/pages/Register"
import AppBootstrap from "@/pages/AppBootstrap"
import OnboardingPage from "@/pages/Onboarding"
import DashboardPage from "@/pages/Dashboard"
import { RequireAuth } from "@/auth/RequireAuth"

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<BootstrapLayout />}>
        <Route path="/app" element={<AppBootstrap />} />
      </Route>

      <Route element={<AppLayout />}>
        <Route path="/" element={<HomeGate />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route element={<RequireAuth />}>
          <Route path="/onboarding" element={<OnboardingPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
        </Route>
      </Route>
    </Routes>
  )
}
