import { useContext } from "react";
import { AuthContext } from "../contexts/auth/auth-context";

const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("Use Auth must be in a auth Provider");
  }

  return context;
};

export default useAuthContext;
