import React, { useState } from "react";
import axios from "axios";
import axiosInstance from "../utils/axios.js";
import { useDispatch, useSelector } from "react-redux";
import { setMessage } from "../features/conversation/conversationSlice.js";

const useSendMessage = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { messages } = useSelector((state) => state.conversation);
  const { user } = useSelector(
    (state) => state.conversation.selectedConversation
  );

  const sendMessages = async (message) => {
    if (!message.trim() || !user?._id) return;

    setLoading(true);
    const authUser = JSON.parse(localStorage.getItem("Auth"));

    const messageObj = {
      message,
      receiverId: user._id,
      senderId: authUser.user._id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      _id: Date.now().toString(),
      __v: 0,
    };

    // Optimistic update
    dispatch(setMessage([...messages, messageObj]));

    try {
      await axiosInstance.post(`/message/send/${user._id}`, { message });
      setLoading(false);
    } catch (error) {
      console.log("Error in send messages", error);
      // Remove the optimistic update if the message failed to send
      dispatch(setMessage(messages));
      setLoading(false);
    }
  };

  return { loading, sendMessages };
};

export default useSendMessage;
