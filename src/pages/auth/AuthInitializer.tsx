// import { useEffect } from "react";
// import { useAppState } from "../../hooks/useAppState";
// import { useSetSelected } from "../../hooks/useSetSelected";
// import axios from "axios";

// const AuthInitializer = () => {
//   const { accessToken } = useAppState();
//   const setSelected = useSetSelected();

//   useEffect(() => {
//     const checkAuth = async () => {
//       if (!accessToken) return;
//       try {
//         await axios.get("https://mementos-backend.onrender.com/users/loginUser", {
//           headers: { Authorization: `Bearer ${accessToken}` },
//         });
//         setSelected("accessToken", accessToken);
//       } catch {
//         setSelected("isAuthenticated", false);
//       }
//     };
//     checkAuth();
//   }, [accessToken, setSelected]);
//   return null;
// };

// export default AuthInitializer;
