import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Blankprint from './pages/(users)/BlankPrint';
import PhotoStripe from './pages/(users)/PhotoStripe';
import Polaroid from './pages/(users)/Polariod';
import GetStarted from './pages/(users)/GetStarted';
import Navigation from './components/Navbar';
import NewUser from './pages/(users)/NewUser';

function App() {
  return (
    <Router>
      <Routes >
        <Route path="/" element={<Navigation />}>
          <Route index element={<Home />} />
          <Route path="/get-started" element={<GetStarted />} />
          <Route path="/newUser" element={<NewUser />} />
          <Route path="/blankprint" element={<Blankprint />} />
          <Route path="/polaroid" element={<Polaroid />} />
          <Route path="/photostripe" element={<PhotoStripe />} />
        </Route>
      </Routes>
    </Router >
  );
}

export default App

// file for contents
// create components, also for icons