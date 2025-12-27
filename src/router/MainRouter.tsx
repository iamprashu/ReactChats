import { BrowserRouter, Route, Routes } from "react-router-dom";
import PublicRoute from "../components/PublicRoute";
import Login from "../pages/auth/Login";
const MainRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PublicRoute />}>
          <Route index element={<Login />} />
        </Route>

        <Route path="/app" element={<div>hello</div>} />
      </Routes>
    </BrowserRouter>
  );
};

export default MainRouter;
