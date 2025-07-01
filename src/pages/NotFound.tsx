import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Logo } from "../assets/Logo";

const NotFound = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate(-1);
    }, 2000);
    return () => clearTimeout(timeout);
  }, [navigate]);
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <Logo />
      <h1 className="text-2xl font-bold">404 - Page Not Found</h1>
      <p className="text-gray-500 mt-2">Redirecting you back...</p>
      <p className="mt-1 text-xs text-gray-400">
        Attempted: {location.pathname}
      </p>
    </div>
  );
};

export default NotFound;
