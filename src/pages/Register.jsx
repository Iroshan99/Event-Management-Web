import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "tailwindcss";

export default function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "participant",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/register", formData);
      navigate("/login");
    } catch (error) {
      console.error(error.response.data.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" name="username" placeholder="Username" onChange={handleChange} required className="w-full p-2 border rounded" />
          <input type="email" name="email" placeholder="Email" onChange={handleChange} required className="w-full p-2 border rounded" />
          <input type="password" name="password" placeholder="Password" onChange={handleChange} required className="w-full p-2 border rounded" />
          <select name="role" onChange={handleChange} className="w-full p-2 border rounded">
            <option value="participant">Participant</option>
            <option value="organizer">Organizer</option>
          </select>
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">Register</button>
        </form>
      </div>
    </div>
  );
}
