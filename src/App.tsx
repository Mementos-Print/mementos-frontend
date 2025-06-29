import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import PostCard from "./pages/users/PostCard";
import PhotoStripe from "./pages/users/PhotoStripe";
import Polaroid from "./pages/users/Polariod";
import GetStarted from "./pages/users/GetStarted";
import Navigation from "./components/layout/Layout";
// import NewUser from "./pages/users/NewUser";
import GetStartedAdmin from "./pages/admin/GetStarted";
import LoginAdmin from "./pages/admin/AdminLogin";
import AdminPostCardList from "./pages/admin/PostCard";
import AdminPolariodList from "./pages/admin/Polariod";
import AdminRoute from "./Routes/AdminRoute";
import ProtectedRoute from "./pages/auth/ProtectedRoute";
import useTokenRefresh from "./hooks/useTokenRefresh";
import SignUp from "./pages/auth/Signup";
import SignIn from "./pages/auth/Signin";

function App() {
  useTokenRefresh();

  return (
    <Router>
      <Routes>
        {/* User Routes */}
        <Route path="/" element={<Navigation />}>
          <Route index={true} element={<Home />} />
          <Route path="/auth/user/">
            <Route path="signin" element={<SignIn />} />
            <Route path="signup" element={<SignUp />} />
          </Route>
          <Route path="/user/dashboard" element={<ProtectedRoute />}>
            <Route index={true} element={<GetStarted />} />
            <Route path="polaroid" element={<Polaroid />} />
            <Route path="postcard" element={<PostCard />} />
            <Route path="photostripe" element={<PhotoStripe />} />
            <Route path="get-started" element={<GetStarted />} />
          </Route>
        </Route>

        {/* Admin Routes */}
        <Route path="admin" element={<Navigation />}>
          <Route path="login" element={<LoginAdmin />} />
          <Route element={<AdminRoute />}>
            <Route
              index
              element={<Navigate to="/admin/get-started" replace />}
            />
            <Route path="get-started" element={<GetStartedAdmin />} />
            <Route path="postcard" element={<AdminPostCardList />} />
            <Route path="polaroid" element={<AdminPolariodList />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
