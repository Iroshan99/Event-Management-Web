import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "tailwindcss";

export default function LandingPage() {
  return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-900">
        <h1 className="text-4xl font-bold mb-6">Welcome to Event Management</h1>
        <p className="text-lg mb-4">Join us today to manage and attend events easily!</p>
        
        {/* Navigation Buttons */}
        <div className="flex space-x-4 mb-8 mt-4 cotent-center">
          <Link to="/login">
            <button className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition">
              Login
            </button>
          </Link>
          <Link to="/register">
            <button className="px-6 py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition">
              Register
            </button>
          </Link>
        </div>

      </div>
  );
}
