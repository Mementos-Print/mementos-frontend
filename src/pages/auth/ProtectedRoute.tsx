import { Navigate, Outlet } from "react-router-dom";
import { useAppState } from "../../hooks/useAppState";

const ProtectedRoute = () => {
  const { accessToken } = useAppState();
  // if (authLoading) return(
  //   <div>
  //     <img src="/Logo_Mementos.svg" alt="logo" />
  //   </div>
  // ) 
  return accessToken ? <Outlet /> : <Navigate to="/"/>;
};

export default ProtectedRoute;
