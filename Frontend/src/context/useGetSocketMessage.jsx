import React, { useEffect } from "react";
import { useSocketContext } from "./SocketContext.jsx";
import sound from "../assets/notification.mp3";
import { useDispatch, useSelector } from "react-redux";
import { setMessage } from "../features/conversation/conversationSlice.js";

const useGetSocketMessage = () => {
  const dispatch = useDispatch();
  const { socket } = useSocketContext();
  const { messages } = useSelector((state) => state.conversation);

  useEffect(() => {
    socket.on("newMessage", (newMessage) => {
      const notification = new Audio(sound);
      notification.play();
      dispatch(setMessage([...messages, newMessage]));
    });
    return () => {
      socket.off("newMessage");
    };
  }, [socket, messages, setMessage]);
};
export default useGetSocketMessage;
