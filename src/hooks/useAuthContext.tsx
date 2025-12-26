import { useContext } from "react";
import { AuthContext } from "../contexts/contexts";

const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("Please check the auth provider");
  }

  return context;
};

export default useAuthContext;
