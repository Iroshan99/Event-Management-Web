import { useEffect, useState } from "react";
import axios from "axios";

export default function CreatedEventsHistory() {
  const [events, setEvents] = useState([]);
  const [organizerId, setOrganizerId] = useState("");

  useEffect(() => {
    // Retrieve user ID from localStorage or decode JWT token
    const token = localStorage.getItem("token"); // Assuming token is stored in localStorage
    if (token) {
      try {
        const decodedToken = JSON.parse(atob(token.split(".")[1]));
        setOrganizerId(decodedToken.userId); // Set organizer ID from token
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, []);

  useEffect(() => {
    const fetchCreatedEvents = async () => {
      try {
        if (!organizerId) return; // Ensure organizerId is set before making request

        const res = await axios.get(`http://localhost:5000/created-events/${organizerId}`);
        setEvents(res.data);
      } catch (error) {
        console.error("Error fetching created events:", error);
      }
    };

    fetchCreatedEvents();
  }, [organizerId]); // Run when organizerId updates

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Created Events History</h1>
      {events.length === 0 ? (
        <p className="text-center text-gray-600">No events created yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <div key={event._id} className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold">{event.title}</h2>
              <p className="text-gray-600 mt-2">{event.description}</p>
              <p className="text-sm text-gray-500 mt-2">{event.date} - {event.location}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
