  import {
    GoogleOAuthProvider,
    GoogleLogin,
    CredentialResponse,
  } from "@react-oauth/google";
  import { useNavigate } from "react-router-dom";
  import { useSetSelected } from "../../hooks/useSetSelected";
  // import { set } from "react-hook-form";

  const clientId: string = import.meta.env.VITE_GOOGLE_CLIENT_ID || "";

  const GoogleAuth = () => {
    const navigate = useNavigate();
    const setSelected = useSetSelected();

    const handleSuccess = (credentialResponse: CredentialResponse) => {
      console.log(credentialResponse)
      setSelected("isAuthenticated", true);
      navigate("/user/dashboard");
    };
    return (
      <GoogleOAuthProvider clientId={clientId}>
        <GoogleLogin
          onSuccess={handleSuccess}
          onError={() => {
            console.log("Login Failed");
          }}
        />
      </GoogleOAuthProvider>
    );
  };

  export default GoogleAuth;
