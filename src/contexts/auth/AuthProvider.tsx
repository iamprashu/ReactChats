import { useEffect, useState } from "react";
import { AuthContext } from "../contexts";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSessionActive, setSessionActive] = useState<boolean>(false);
  const [sessionLoadded, setSessionLoadded] = useState<boolean>(true); //baad me false krunga

  // api call hoga use effect se jo will check the auth

  const login = () => {
    setSessionActive(true);
  };

  const logOut = () => {
    setSessionActive(false);
  };

  return (
    <AuthContext.Provider
      value={{ isSessionActive, login, logOut, sessionLoadded }}
    >
      {children}
    </AuthContext.Provider>
  );
}
