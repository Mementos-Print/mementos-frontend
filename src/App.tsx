import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Blankprint from './pages/(users)/BlankPrint';
import PhotoStripe from './pages/(users)/PhotoStripe';
import Polaroid from './pages/(users)/Polariod';
import GetStarted from './pages/(users)/GetStarted';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/get-started" element={<GetStarted />} />
        <Route path="/blankprint" element={<Blankprint />} />
        <Route path="/polaroid" element={<Polaroid />} />
        <Route path="/photostripe" element={<PhotoStripe />} />
      </Routes>
    </Router>
  );
}

export default App

// file for contents
// create components, also for icons