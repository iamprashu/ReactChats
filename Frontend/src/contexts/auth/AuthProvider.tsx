import { useEffect, useState } from "react";
import { AuthContext } from "./auth-context";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSessionActive, setSessionActive] = useState<boolean>(false);
  const [sessionLoaded, setSessionLoaded] = useState<boolean>(true);
  const [sessionToken, setSessionToken] = useState<string>("");

  async function checkSession() {}

  const login = () => {
    setSessionActive(true);
  };
  const logoutSession = () => {
    setSessionActive(false);
    setSessionLoaded(false);
  };
  return (
    <AuthContext.Provider
      value={{
        login,
        logoutSession,
        isSessionActive,
        sessionLoaded,
        setSessionLoaded,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
