import {Route, Routes} from "react-router-dom";
import {AppLayout, BootstrapLayout} from "@/app/AppLayout";

import HomePage from "@/pages/Home";
import LoginPage from "@/pages/Login";
import RegisterPage from "@/pages/Register";
import AppBootstrap from "@/pages/AppBootstrap";

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
        {/* /demo, etc */}
      </Route>
    </Routes>
  );
}
