import React, { useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import Cookies from "js-cookie";

export default function Navbar() {
  const [loading, setLoading] = useState(false);
  const [, setAuthUser] = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    setLoading(true);
    try {
      await axios.post("/api/user/logout");
      localStorage.removeItem("ChatApp");
      Cookies.remove("jwt");
      setAuthUser(undefined);
      toast.success("Logged out successfully");
      navigate("/auth/login", { replace: true });
    } catch (error) {
      console.error("Error in Logout:", error);
      toast.error(error.response?.data?.error || "Error in logging out");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="border flex justify-center h-[30px]">
        <Link to="/" className="border px-8">
          Home
        </Link>
        <Link to="/" className="border px-8">
          Network
        </Link>
        <Link to="/message" className="border px-8">
          Message
        </Link>
        <Link to="/" className="border px-8">
          Setting
        </Link>
        <Link to="/profile" className="border px-8">
          Profile
        </Link>
        <button
          className="border px-8"
          onClick={handleLogout}
          disabled={loading}
        >
          {loading ? "Logging out..." : "Logout"}
        </button>
      </div>
    </>
  );
}
