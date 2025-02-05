import { useEffect, useState } from "react";
import axios from "axios";

export default function CreatedEventsHistory() {
  const [events, setEvents] = useState([]);
  const organizerId = localStorage.getItem("token"); // Get from local storage

  useEffect(() => {
    const fetchCreatedEvents = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/created-events/${organizerId}`);
        setEvents(res.data);
      } catch (error) {
        console.error("Error fetching created events:", error);
      }
    };

    if (organizerId) {
      fetchCreatedEvents();
    }
  }, [organizerId]);

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
