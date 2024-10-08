import { FC } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { LoginPage, RegisterPage } from "../pages";

export const AuthRoutes: FC = () => {
  return (
    <Routes>
      <Route path="login" element={<LoginPage />} />
      <Route path="signup" element={<RegisterPage />} />
      <Route path="/*" element={<Navigate to="auth/login" />} />
    </Routes>
  );
};
