import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import PublicRoutes from "./PublicRoutes";
import Auth from "../pages/Auth";
import PrivateRoutes from "./PrivateRoutes";
const MainRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoutes>
              <Home />
            </PrivateRoutes>
          }
        />
        <Route
          path="/auth"
          element={
            <PublicRoutes>
              <Auth />
            </PublicRoutes>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default MainRouter;
