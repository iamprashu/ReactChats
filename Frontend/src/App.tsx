import { ClerkProvider } from "@clerk/clerk-react";
import MainRouter from "./router/MainRouter";
import GlobalContextProvider from "./components/GlobalContextProvider";
import { Toaster } from "react-hot-toast";

function App() {
  const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY!;
  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <Toaster />
      <GlobalContextProvider>
        <MainRouter />
      </GlobalContextProvider>
    </ClerkProvider>
  );
}

export default App;
