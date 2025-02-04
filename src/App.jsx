import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ParticipantDashboard  from "./pages/ParticipantDashboard";
import LandingPage from "./pages/LandingPage";
import RegisteredEvents from "./pages/RegisteredEvents";
import CreateEvent from "./pages/CreateEvent";
import OrganizerDashboard from "./pages/OrganizerDashboard";
import "tailwindcss";

export default function App() {
  return (
    <Router>

        {/* Routes for Login & Register */}
        <Routes>
          <Route path="/" element={<LandingPage/>}></Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/participant-dashboard" element={<ParticipantDashboard/>}/>
          <Route path="/registered-events" element={<RegisteredEvents/>}/>
          <Route path="/create-event" element={<CreateEvent/>} />
          <Route path="/organizer-dashboard" element={<OrganizerDashboard />} />
        </Routes>
    </Router>
  );
}
