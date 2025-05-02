import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import axiosInstance from "../utils/axios";

function useGetAllUsers() {
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getUsers = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get("/user/allusers", {
          // Adding credentials option if your backend requires it
          withCredentials: true,
        });
        setAllUsers(response.data);
        setLoading(false);
      } catch (error) {
        console.log("Error in useGetAllUsers: " + error);
      }
    };
    getUsers();
  }, []);
  return [allUsers, loading];
}

export default useGetAllUsers;
