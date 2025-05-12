import React, { useEffect } from "react";
import { useSocketContext } from "../../../context/SocketContext.jsx";
import { countries } from "countries-list";
import { useDispatch, useSelector } from "react-redux";
import {
  setSelectedConversationUser,
  setEnterCount,
  setUnreadCount,
} from "../../../features/conversation/conversationSlice.js";
import axiosInstance from "../../../utils/axios.js";

function User({ user }) {
  const dispatch = useDispatch();
  const unreadCount = useSelector(
    (state) => state.conversation.unreadCounts[user._id] || 0
  );
  const selectedConversation = useSelector(
    (state) => state.conversation.selectedConversation.user
  );
  const isSelected = selectedConversation?._id === user._id;
  const { socket, onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(user._id);
  const authUser = JSON.parse(localStorage.getItem("Auth"));

  // Set initial unread count from user data
  useEffect(() => {
    if (user.unreadCount) {
      dispatch(setUnreadCount({ userId: user._id, count: user.unreadCount }));
    }
  }, [user._id, user.unreadCount, dispatch]);

  const calculateAge = (birthday) => {
    if (!birthday) return "";
    const birthDate = new Date(birthday);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  function getCountryName(code) {
    if (!code) return "";
    return countries[code]?.name || code;
  }

  const handleSelectClick = async (user) => {
    dispatch(setSelectedConversationUser(user));
    dispatch(setEnterCount(0));

    // Only clear unread count if there are unread messages
    if (unreadCount > 0) {
      dispatch(setUnreadCount({ userId: user._id, count: 0 }));
      try {
        await axiosInstance.put(`/message/read/${user._id}`);
      } catch (error) {
        console.error("Error marking messages as read:", error);
      }
    }
  };

  return (
    <div
      className={`border-b px-4 py-2  flex items-center justify-between hover:bg-zinc-100 duration-300 ${
        isSelected ? "bg-blue-100" : ""
      } cursor-pointer`}
      onClick={() => handleSelectClick(user)}
    >
      <div className="flex gap-4 items-center">
        <div
          className={`avatar ${isOnline ? "avatar-online" : "avatar-offline"}`}
        >
          <div className="w-16">
            <img
              src={user.profileImage}
              alt={user.fullname}
              className="w-full h-full rounded-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
              }}
            />
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex items-end">
            <span className="text-base text-black line-clamp-1">
              {user.fullname}
            </span>
          </div>
          <div className="text-sm text-gray-500">
            {user?.gender?.charAt(0).toUpperCase() + user?.gender?.slice(1)}
            {user?.birthday && <>, {calculateAge(user.birthday)}</>}
            {user?.country && (
              <>
                , {getCountryName(user.country)}{" "}
                <img
                  src={`https://flagcdn.com/w20/${user.country.toLowerCase()}.png`}
                  alt={user.country}
                  className="border inline-block"
                />
              </>
            )}
          </div>
        </div>
      </div>

      {unreadCount > 0 && (
        <div className="w-5 h-5 min-w-5 min-h-5 flex text-sm items-center justify-center rounded-full bg-info text-white">
          {unreadCount}
        </div>
      )}
    </div>
  );
}

export default User;
