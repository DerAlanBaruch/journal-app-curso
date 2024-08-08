import { FC } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { AuthRoutes } from "../auth/routes/AuthRoutes";
import { JournalRoutes } from "../journal/routes/JournalRoutes";
import { AuthStatus } from "../auth/types";
import { CheckingAuth } from "../ui";
import { useCheckAuth } from "../hooks";

export const AppRouter: FC = () => {
  const status = useCheckAuth();

  if (status === AuthStatus.CHECKING) return <CheckingAuth />;

  return (
    <Routes>
      {status === AuthStatus.NOT_AUTHENTICATED && (
        <Route path="/auth/*" element={<AuthRoutes />} />
      )}
      {status === AuthStatus.AUTHENTICATED && (
        <Route path="/*" element={<JournalRoutes />} />
      )}
      <Route path="/*" element={<Navigate to="/auth/login" />} />
    </Routes>
  );
};
