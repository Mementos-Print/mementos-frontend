import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PostCard from "./pages/(users)/PostCard";
import PhotoStripe from "./pages/(users)/PhotoStripe";
import Polaroid from "./pages/(users)/Polariod";
import GetStarted from "./pages/(users)/GetStarted";
import Navigation from "./components/layout/Layout";
// import NewUser from "./pages/users/NewUser";
import ProtectedRoute from "./pages/auth/ProtectedRoute";
import SignUp from "./pages/auth/Signup";
import SignIn from "./pages/auth/Signin";
import NotFound from "./pages/NotFound";
import AuthRoute from "./pages/auth/AuthRoute";
import useRefreshToken from "./hooks/useRefreshToken";
import AuthCallback from "./pages/auth/AuthCallback";
import Dashboard from "./pages/Dashboard";

function App() {
  useRefreshToken();

  return (
    <Router>
      <Routes>
        {/* User Routes */}
        <Route path="/" element={<Navigation />}>
          <Route index={true} element={<Home />} />
          <Route path="/auth/callback" element={<AuthCallback />} />
          <Route path="/auth/user/" element={<AuthRoute />}>
            <Route path="signin" element={<SignIn />} />
            <Route path="signup" element={<SignUp />} />
          </Route>
          <Route path="/dashboard" element={<ProtectedRoute />}>
            <Route index={true} element={<Dashboard />} />
            <Route path="upload" element={<GetStarted />} />
            <Route path="polaroid" element={<Polaroid />} />
            <Route path="postcard" element={<PostCard />} />
            <Route path="photostripe" element={<PhotoStripe />} />
            <Route path="get-started" element={<GetStarted />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
