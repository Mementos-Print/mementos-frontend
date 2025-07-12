import {
  GoogleOAuthProvider,
  GoogleLogin,
  CredentialResponse,
} from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { useSetSelected } from "../../hooks/useSetSelected";
import useStoreContext from "../../hooks/useStoreContext";
// import { set } from "react-hook-form";

  const clientId: string = import.meta.env.VITE_GOOGLE_CLIENT_ID || "";

const GoogleAuth = () => {
  const navigate = useNavigate();
  const setSelected = useSetSelected();
  const { setStore } = useStoreContext();

  const handleSuccess = (credentialResponse: CredentialResponse) => {
    // setSelected("userCredentials", JSON.stringify(credentialResponse, null, 2));
    setSelected("isAuthenticated", true);

    if (credentialResponse?.credential) {
      // Decode the credential (access token) and extract user info
      const decodedToken = JSON.parse(atob(credentialResponse.credential.split(".")[1]));

      const { name, email } = decodedToken;
      setStore((prevStore: any) => ({
        ...prevStore,
        user: {
          name: name,
          email: email,
        },
      }));

      // Navigate to the user dashboard
      navigate("/dashboard");
    } else {
      console.log("Login Failed: No credential found");
    }
  }
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
