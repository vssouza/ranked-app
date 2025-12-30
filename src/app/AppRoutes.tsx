import { Routes, Route } from "react-router-dom";
import { AppLayout } from "./AppLayout";
import HomePage from "@/pages/Home";
import LoginPage from "@/pages/Login";

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
