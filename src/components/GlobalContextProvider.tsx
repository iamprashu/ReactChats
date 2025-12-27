import AuthProvider from "../contexts/auth/AuthProvider";

export default function GlobalContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthProvider>{children}</AuthProvider>;
}
