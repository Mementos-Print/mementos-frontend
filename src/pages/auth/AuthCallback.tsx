import { useNavigate } from "react-router-dom";
import { useSetSelected } from "../../hooks/useSetSelected";
import { useEffect } from "react";

const AuthCallback = () => {
  const navigate = useNavigate();
  const setSelected = useSetSelected();
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("accessToken");
    if (token) {
      setSelected("accessToken", token);
      console.log(token)
      navigate("/dashboard");
    } else {
      console.log("No access token received");
      navigate("/");
    }
  }, []);
  return (
    <div>
      <img src="/Logo_Mementos.svg" alt="logo" />
    </div>
  );
};

export default AuthCallback;
