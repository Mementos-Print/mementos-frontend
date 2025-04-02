import useStoreContext from "../useStoreContext";
import { Navigate, Outlet } from "react-router-dom";

const AdminRoute = () => {
    const { isAdmin, isLoading } = useStoreContext();

    if (isLoading) {
        return <div>Loading...</div>; // Or a spinner 
    }

    if (!isAdmin) {
        return <Navigate to="/admin/login" replace />;
    }

    return <Outlet />;
};

export default AdminRoute;