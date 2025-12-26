import React from "react";
import AuthProvider from "../contexts/auth/AuthProvider";

const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  return <AuthProvider>{children}</AuthProvider>;
};

export default GlobalProvider;
