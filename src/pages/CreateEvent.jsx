import { useState } from "react";
import axios from "axios";
import "tailwindcss";

export default function CreateEvent() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
  });

  const [organizerId, setOrganizerId] = useState("");

  useState(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      setOrganizerId(decodedToken.userId);
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/create-event", { ...formData, organizerId });
      alert("Event created successfully!");
    } catch (error) {
      alert("Error creating event");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Create Event</h2>
        <input
          type="text"
          name="title"
          placeholder="Event Title"
          className="w-full p-2 border rounded mb-4"
          onChange={handleChange}
        />
        <textarea
          name="description"
          placeholder="Event Description"
          className="w-full p-2 border rounded mb-4"
          onChange={handleChange}
        ></textarea>
        <input
          type="date"
          name="date"
          className="w-full p-2 border rounded mb-4"
          onChange={handleChange}
        />
        <input
          type="text"
          name="location"
          placeholder="Event Location"
          className="w-full p-2 border rounded mb-4"
          onChange={handleChange}
        />
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
          Create Event
        </button>
      </form>
    </div>
  );
}
