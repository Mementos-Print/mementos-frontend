import { Navigate, Outlet } from "react-router-dom";
import { useAppState } from "../../hooks/useAppState";

const AuthRoute = () => {
  const { accessToken } = useAppState();
  return accessToken ? <Navigate to="/dashboard" /> : <Outlet />
};

export default AuthRoute;
