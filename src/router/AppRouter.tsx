import { FC } from "react";
import { Route, Routes } from "react-router-dom";
import { AuthRoutes } from "../auth/routes/AuthRoutes";
import { JournalRoutes } from "../journal/routes/JournalRoutes";

export const AppRouter: FC = () => {
  return (
    <Routes>
      {/* Auth */}
      <Route path="/auth/*" element={<AuthRoutes />} />
      {/* Journal */}
      <Route path="/*" element={<JournalRoutes />} />
    </Routes>
  );
};
