import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice";

export default function Navbar() {
  const authUser = useSelector((state) => state.auth.user);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    setLoading(true);
    try {
      await axios.post("/api/user/logout");
      localStorage.removeItem("Auth");
      Cookies.remove("jwt");
      dispatch(logout());
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
      <div className="border flex justify-center h-[30px] bg-white">
        <button
          onClick={() => navigate("/")}
          className={`border px-8 ${
            authUser.user.isActivated === false ? "text-gray-400" : ""
          }`}
          disabled={authUser.user.isActivated === false ? "disabled" : ""}
        >
          Home
        </button>
        <button
          onClick={() => navigate("/")}
          className={`border px-8 ${
            authUser.user.isActivated === false ? "text-gray-400" : ""
          }`}
          disabled={authUser.user.isActivated === false ? "disabled" : ""}
        >
          Network
        </button>
        <button
          onClick={() => navigate("/message")}
          className={`border px-8 ${
            authUser.user.isActivated === false ? "text-gray-400" : ""
          }`}
          disabled={authUser.user.isActivated === false ? "disabled" : ""}
        >
          Message
        </button>
        <button
          onClick={() => navigate("/")}
          className={`border px-8 ${
            authUser.user.isActivated === false ? "text-gray-400" : ""
          }`}
          disabled={authUser.user.isActivated === false ? "disabled" : ""}
        >
          Setting
        </button>
        <button onClick={() => navigate("/profile")} className="border px-8">
          Profile
        </button>
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
