import { useState } from "react";
import { AuthContext } from "./auth-context";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSessionActive, setSessionActive] = useState(true);
  const [sessionLoaded, setSessionLoaded] = useState(false);

  const login = () => {
    setSessionActive(true);
  };
  const logout = () => {
    setSessionActive(false);
  };
  return (
    <AuthContext.Provider value={{ login, logout, isSessionActive }}>
      {children}
    </AuthContext.Provider>
  );
}
