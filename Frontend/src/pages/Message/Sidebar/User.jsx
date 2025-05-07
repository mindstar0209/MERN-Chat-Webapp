import React from "react";
import { useSocketContext } from "../../../context/SocketContext.jsx";
import { countries } from "countries-list";
import { useDispatch, useSelector } from "react-redux";
import {
  setSelectedConversationUser,
  setEnterCount,
} from "../../../features/conversation/conversationSlice.js";

function User({ user }) {
  const dispatch = useDispatch();
  const selectedConversation = useSelector(
    (state) => state.conversation.selectedConversation.user
  );
  const isSelected = selectedConversation?._id === user._id;
  const { socket, onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(user._id);

  const defaultAvatar =
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";

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

  const handleSelectClick = (user) => {
    dispatch(setSelectedConversationUser(user));
    dispatch(setEnterCount(0));
  };

  return (
    <div
      className={`border-b hover:bg-zinc-100 duration-300 ${
        isSelected ? "bg-blue-100" : ""
      } cursor-pointer`}
      onClick={() => handleSelectClick(user)}
    >
      <div className="flex px-4 py-2 gap-4 items-center">
        <div
          className={`avatar ${isOnline ? "avatar-online" : "avatar-offline"}`}
        >
          <div className="w-16">
            <img
              src={user.profileImage || defaultAvatar}
              alt={user.fullname}
              className="w-full h-full rounded-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = defaultAvatar;
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
    </div>
  );
}

export default User;
