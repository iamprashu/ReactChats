import { Outlet, useNavigate } from "react-router-dom";
import useAuthContext from "../hooks/useAuthContext";
import Loader from "./Loader";
import { useEffect } from "react";

const PrivateRoutes = () => {
  const { isSessionActive, sessionLoaded } = useAuthContext();
  const router = useNavigate();

  useEffect(() => {
    if (sessionLoaded && !isSessionActive) {
      router("/");
    }
  }, [isSessionActive, sessionLoaded]);

  if (!sessionLoaded) {
    return <Loader text="please wait while we authenticate you" />;
  }

  return <Outlet />;
};

export default PrivateRoutes;
