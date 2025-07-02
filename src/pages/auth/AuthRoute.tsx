import { Navigate, Outlet } from "react-router-dom";
import { useAppState } from "../../hooks/useAppState";

const AuthRoute = () => {
  const { isAuthenticated } = useAppState();
  return isAuthenticated ? <Navigate to="/user/dashboard" /> : <Outlet />
};

export default AuthRoute;
