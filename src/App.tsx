import { ClerkProvider } from "@clerk/clerk-react";
import MainRouter from "./router/MainRouter";
import GlobalContextProvider from "./components/GlobalContextProvider";

function App() {
  const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY!;
  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <GlobalContextProvider>
        <MainRouter />
      </GlobalContextProvider>
    </ClerkProvider>
  );
}

export default App;
