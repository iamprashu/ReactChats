import { useEffect, useState } from "react";
import { AuthContext } from "./auth-context";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSessionActive, setSessionActive] = useState<boolean>(false);
  const [sessionLoaded, setSessionLoaded] = useState<boolean>(false);
  const [sessionToken, setSessionToken] = useState<string>("");

  useEffect(() => {
    setTimeout(() => {
      setSessionLoaded(true);
      setSessionActive(true);
      setSessionToken("prashu");
    }, 5000);
  }, [sessionLoaded, setSessionLoaded, sessionToken]);

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
