import { useEffect } from "react";
import useAuthContext from "../hooks/useAuthContext";
import { Navigate, Outlet, useNavigate } from "react-router-dom";

const PublicRoute = () => {
  const { isSessionActive } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSessionActive) {
      navigate("/app");
    }
  }, [isSessionActive]);

  return <Outlet />;
};

export default PublicRoute;
