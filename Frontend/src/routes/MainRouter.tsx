import { BrowserRouter, Route, Routes } from "react-router-dom";
import PublicRoutes from "./PublicRoutes";
import Auth from "../pages/Auth";
import PrivateRoutes from "./PrivateRoutes";
import Dashboard from "../pages/Dashboard";
const MainRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* all public routey here */}
        <Route path="/" element={<PublicRoutes />}>
          <Route index element={<Auth />} />
        </Route>

        {/* all private rtio */}
        <Route path="/app" element={<PrivateRoutes />}>
          <Route index element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default MainRouter;
