import React, { useState } from "react";
import { AuthContext } from "./AuthContext";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [authLoadded, setAuthLoadded] = useState<boolean>(false);
  return (
    <AuthContext.Provider value={{ authLoadded }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
