import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axios.js";
import { useDispatch, useSelector } from "react-redux";
import {
  clearMessages,
  setMessage,
} from "../features/conversation/conversationSlice.js";

const useGetMessage = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { messages } = useSelector((state) => state.conversation);
  const { user } = useSelector(
    (state) => state.conversation.selectedConversation
  );

  useEffect(() => {
    const getMessages = async () => {
      if (user && user._id) {
        setLoading(true);
        try {
          const res = await axiosInstance.get(`/message/get/${user._id}`);
          dispatch(setMessage(res.data));
          setLoading(false);
        } catch (error) {
          console.log("Error in getting messages", error);
          setLoading(false);
        }
      } else {
        dispatch(clearMessages());
      }
    };
    getMessages();
  }, [user, dispatch]);
  return { loading, messages };
};

export default useGetMessage;
