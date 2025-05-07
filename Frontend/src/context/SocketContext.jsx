import React, { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import axiosInstance from "../utils/axios";

const SocketContext = createContext();

export const useSocketContext = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    const authUser = JSON.parse(localStorage.getItem("Auth"));

    if (authUser) {
      const socket = io("http://localhost:5002", {
        query: {
          userId: authUser.user._id,
        },
      });

      setSocket(socket);

      socket.on("getOnlineUsers", (users) => {
        setOnlineUsers(users);
      });

      return () => {
        socket.close();
      };
    }
  }, []);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
