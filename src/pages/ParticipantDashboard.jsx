import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export default function ParticipantDashboard() {
  const [events, setEvents] = useState([]);
  const [userId, setUserId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get("http://localhost:5000/events");
        setEvents(res.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      setUserId(decodedToken.userId);
    }

    fetchEvents();
  }, []);

  const handleRegister = async (eventId) => {
    if (!userId) {
      alert("User not authenticated. Please log in again.");
      return;
    }
  
    try {
      await axios.post("http://localhost:5000/register-event", { userId, eventId });
      alert("Successfully registered!");
    } catch (error) {
      console.error("Error registering:", error.response?.data?.message || error.message);
      alert(error.response?.data?.message || "Error registering for event");
    }
  };
  

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Available Events</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <div key={event._id} className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">{event.title}</h2>
            <p className="text-gray-600 mt-2">{event.description}</p>
            <p className="text-sm text-gray-500 mt-2">{event.date} - {event.location}</p>
            <button
              onClick={() => handleRegister(event._id)}
              className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
            >
              Register
            </button>
          </div>
        ))}
      </div>
      <div>
      <button
        onClick={() => navigate("/registered-events")}
         className="mt-4 bg-purple-500 text-white px-4 py-2 rounded"
      >
         View Registered Events
      </button>
      </div>
    </div>
  );
}
