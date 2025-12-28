import { BrowserRouter, Route, Routes } from "react-router-dom";
import PublicRoute from "../components/PublicRoute";
import Login from "../pages/auth/Login";
import PrivateRoutes from "../components/PrivateRoutes";
import Home from "../pages/Home";
const MainRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* public routes if  */}
        <Route path="/" element={<PublicRoute />}>
          <Route index element={<Login />} />
        </Route>

        {/* private routes */}
        <Route path="/app" element={<PrivateRoutes />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default MainRouter;
