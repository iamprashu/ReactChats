import useAuthContext from "../hooks/useAuthContext";
import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import Loader from "../contexts/Loader";

const PrivateRoutes = ({ children }: { children: ReactNode }) => {
  const { isSessionActive, sessionLoadded } = useAuthContext();

  if (!sessionLoadded) {
    return <Loader />;
  }

  if (!isSessionActive) {
    return <Navigate to="/auth" replace />;
  }

  return <div>{children}</div>;
};

export default PrivateRoutes;
