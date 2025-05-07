import { useEffect, useState } from "react";
import axiosInstance from "../utils/axios";
import { useDispatch, useSelector } from "react-redux";
import { setUsers } from "../features/conversation/conversationSlice";

export default function useGetChatUsers() {
  const dispatch = useDispatch();

  const getChatUsers = async () => {
    try {
      await axiosInstance.get("/conversations/users").then((res) => {
        console.log("data1:", res?.data);
        dispatch(setUsers(res.data));
      });
    } catch (error) {
      console.log("Error fetching chat users:", error);
    }
  };

  return getChatUsers;
}
