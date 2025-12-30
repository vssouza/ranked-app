import { Routes, Route } from "react-router-dom";
import { AppLayout } from "./AppLayout";
import HomePage from "@/pages/home";
import LoginPage from "@/pages/login";

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
      </Route>
    </Routes>
  );
}
