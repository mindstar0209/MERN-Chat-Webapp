import React, { useState } from "react";
import { TbLogout2 } from "react-icons/tb";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthProvider";
import { useNavigate } from "react-router-dom";

function Logout() {
  const [loading, setLoading] = useState(false);
  const [, setAuthUser] = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    setLoading(true);
    try {
      const res = await axios.post("/api/user/logout");
      localStorage.removeItem("ChatApp");
      Cookies.remove("jwt");
      setAuthUser(undefined);
      setLoading(false);
      toast.success("Logged out successfully");
      navigate("/auth/login");
    } catch (error) {
      console.log("Error in Logout", error);
      toast.error("Error in logging out");
    }
  };
  return (
    <>
      <div className="w-[4%]   bg-slate-950 text-white  flex flex-col justify-end ">
        <div className="p-3  align-bottom ">
          <button>
            <TbLogout2
              className="text-5xl p-2 hover:bg-gray-600 rounded-lg duration-300"
              onClick={handleLogout}
            />
          </button>
        </div>
      </div>
    </>
  );
}
export default Logout;
