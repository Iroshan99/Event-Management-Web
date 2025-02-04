import { useEffect, useState } from "react";
import axios from "axios";

export default function RegisteredEvents() {
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = JSON.parse(atob(token.split(".")[1]));
        setUserId(decodedToken.userId);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, []);

  useEffect(() => {
    if (!userId) return; // Ensure userId is available before calling API

    const fetchRegisteredEvents = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/registered-events/${userId}`);
        console.log("Fetched registered events:", res.data); // Debugging
        setRegisteredEvents(res.data);
      } catch (error) {
        console.error("Error fetching registered events:", error);
      }
    };

    fetchRegisteredEvents();
  }, [userId]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Registered Events</h1>
      {registeredEvents.length === 0 ? (
        <p className="text-center text-gray-600">No registered events yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {registeredEvents.map(({ eventId }) => (
            eventId ? (
              <div key={eventId._id} className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold">{eventId.title}</h2>
                <p className="text-gray-600 mt-2">{eventId.description}</p>
                <p className="text-sm text-gray-500 mt-2">{eventId.date} - {eventId.location}</p>
              </div>
            ) : (
              <p key={Math.random()} className="text-red-500">Error: Event details not found</p>
            )
          ))}
        </div>
      )}
    </div>
  );
}
