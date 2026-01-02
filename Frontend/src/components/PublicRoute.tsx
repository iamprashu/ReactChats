import { useEffect } from "react";
import useAuthContext from "../hooks/useAuthContext";
import { Navigate, Outlet, useNavigate } from "react-router-dom";

const PublicRoute = () => {
  const { isSessionActive, sessionLoaded } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSessionActive && sessionLoaded) {
      navigate("/app");
    }
  }, [isSessionActive, sessionLoaded]);

  if (!sessionLoaded) {
    return <div>Pleasse wait while we load authentication</div>;
  }

  return <Outlet />;
};

export default PublicRoute;
