import AuthProvider from "../../contexts/auth/AuthProvider";
import MainRouter from "../../routes/MainRouter";
import { Toaster } from "react-hot-toast";

const GlobalProvider = () => {
  return (
    <div className="w-screen h-screen">
      <Toaster />
      <AuthProvider>
        <MainRouter />
      </AuthProvider>
    </div>
  );
};

export default GlobalProvider;
