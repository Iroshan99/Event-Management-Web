import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function OrganizerDashboard() {
  const [events, setEvents] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [organizerId, setOrganizerId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      setOrganizerId(decodedToken.userId);
    }

    const fetchOrganizerData = async () => {
      try {
        const eventsRes = await axios.get(`http://localhost:5000/organizer-events/${organizerId}`);
        setEvents(eventsRes.data);

        const notificationsRes = await axios.get(`http://localhost:5000/notifications/${organizerId}`);
        setNotifications(notificationsRes.data);
      } catch (error) {
        console.error("Error fetching organizer data:", error);
      }
    };

    if (organizerId) fetchOrganizerData();
  }, [organizerId]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Your Events</h1>
      
      {/* Notifications Section */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold">Notifications</h2>
        {notifications.length === 0 ? (
          <p className="text-gray-600">No new notifications.</p>
        ) : (
          <ul className="mt-2">
            {notifications.map((notif) => (
              <li key={notif._id} className="p-2 border-b">
                {notif.message}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Events Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <div key={event._id} className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">{event.title}</h2>
            <p className="text-gray-600 mt-2">{event.description}</p>
            <p className="text-sm text-gray-500 mt-2">{event.date} - {event.location}</p>
            <p className="text-blue-600 font-bold mt-4">Registered Participants: {event.registrationCount}</p>
          </div>
        ))}
      </div>
      <div>
      <button
        onClick={() => navigate("/create-event")}
         className="mt-4 bg-purple-500 text-white px-4 py-2 rounded"
      >
         Create Event
      </button>
      </div>
    </div>
  );
}
