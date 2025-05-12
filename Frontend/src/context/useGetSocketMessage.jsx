import React, { useEffect } from "react";
import { useSocketContext } from "./SocketContext.jsx";
import sound from "../assets/notification.mp3";
import { useDispatch, useSelector } from "react-redux";
import {
  setMessage,
  incrementUnreadCount,
  setUnreadCount,
} from "../features/conversation/conversationSlice.js";
import axiosInstance from "../utils/axios.js";

const useGetSocketMessage = () => {
  const dispatch = useDispatch();
  const { socket } = useSocketContext();
  const { messages } = useSelector((state) => state.conversation);
  const { user } = useSelector(
    (state) => state.conversation.selectedConversation
  );
  const authUser = JSON.parse(localStorage.getItem("Auth"));

  useEffect(() => {
    if (!socket || !authUser?.user?._id) return;

    const handleNewMessage = async (newMessage) => {
      // If the message is for the current user
      if (newMessage.receiverId === authUser.user._id) {
        // Play notification sound
        const notification = new Audio(sound);
        notification.play();

        // If the message is from the currently selected user
        if (user && newMessage.senderId === user._id) {
          dispatch(setMessage([...messages, newMessage]));
          // Mark as read if we're in the conversation
          try {
            await axiosInstance.put(`/message/read/${user._id}`);
          } catch (error) {
            console.error("Error marking message as read:", error);
          }
        } else {
          // Increment unread count for the sender
          dispatch(incrementUnreadCount(newMessage.senderId));
        }
      }
    };

    socket.on("newMessage", handleNewMessage);

    return () => {
      socket.off("newMessage", handleNewMessage);
    };
  }, [socket, messages, user, authUser?.user?._id, dispatch]);
};

export default useGetSocketMessage;
