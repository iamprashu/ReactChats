import useAuthContext from "../hooks/useAuthContext";
import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import Loader from "../contexts/Loader";

const PublicRoutes = ({ children }: { children: ReactNode }) => {
  const { isSessionActive, sessionLoadded } = useAuthContext();

  console.log(isSessionActive);

  if (!sessionLoadded) {
    return <Loader />;
  }

  if (isSessionActive) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default PublicRoutes;
