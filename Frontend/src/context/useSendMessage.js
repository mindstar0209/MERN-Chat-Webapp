import React, { useState } from "react";
import useConversation from "../context/useConversation.js";
import axios from "axios";
import axiosInstance from "../utils/axios";

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessage, selectedConversation } = useConversation();
  const sendMessages = async (message) => {
    setLoading(true);
    const authUser = JSON.parse(localStorage.getItem("ChatApp"));

    const messageObj = {
      message,
      receiverId: selectedConversation._id,
      senderId: authUser.user._id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      _id: Date.now().toString(),
      __v: 0
    };

    setMessage([...messages, messageObj]);
    try {
      await axiosInstance.post(
        `/message/send/${selectedConversation._id}`,
        { message }
      ).then((res) => {
        console.log("res.Data:", res.data)
      })
      // setMessage([...messages, res.data]);
      setLoading(false);
    } catch (error) {
      console.log("Error in send messages", error);
      setLoading(false);
    }
  };
  return { loading, sendMessages };
};

export default useSendMessage;
