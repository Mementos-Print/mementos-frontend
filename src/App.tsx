import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PostCard from "./pages/(users)/PostCard";
import PhotoStripe from "./pages/(users)/PhotoStripe";
import Polaroid from "./pages/(users)/Polariod";
import GetStarted from "./pages/(users)/GetStarted";
import Navigation from './components/Navbar';
import NewUser from './pages/(users)/NewUser';
import GetStartedAdmin from "./pages/admin/GetStarted";
import LoginAdmin from "./pages/admin/AdminLogin";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route index={true} element={<Home />} />
          <Route path="polaroid" element={<Polaroid />} />
          <Route path="newUser" element={<NewUser />} />
          <Route path="postcard" element={<PostCard />} />
          <Route path="photostripe" element={<PhotoStripe />} />
          <Route path="get-started" element={<GetStarted />} />
          <Route path="admin/get-started" element={<GetStartedAdmin />} />
          <Route path="admin/login" element={<LoginAdmin />} />
          <Route path="admin/postcard" element={<PostCard />} />
          <Route path="admin/photostripe" element={<PhotoStripe />} />
        </Route>
      </Routes>
    </Router >
  );
}

export default App;

// file for contents
// create components, also for icons
