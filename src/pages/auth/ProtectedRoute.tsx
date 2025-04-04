import { Navigate, Outlet } from "react-router-dom";
import { useAppState } from "../../hooks/useAppState";

const ProtectedRoute = () => {
  const { isAuthenticated } = useAppState();
  return isAuthenticated ? <Outlet /> : <Navigate to="/auth/user/signin" />;
};

export default ProtectedRoute;
