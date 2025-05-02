import React from "react";
import useConversation from "../../../context/useConversation.js";
import { useSocketContext } from "../../../context/SocketContext.jsx";

function User({ user }) {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const isSelected = selectedConversation?._id === user._id;
  const { socket, onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(user._id);

  const defaultAvatar =
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";

  return (
    <div
      className={`border-b hover:bg-zinc-100 duration-300 ${
        isSelected ? "bg-blue-100" : ""
      } cursor-pointer`}
      onClick={() => setSelectedConversation(user)}
    >
      <div className="flex space-x-4 px-2 py-2 ">
        <div className={`avatar ${isOnline ? "online" : ""}`}>
          <div className="w-16">
            <img
              src={user.profileImage || defaultAvatar}
              alt={user.fullname}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = defaultAvatar;
              }}
            />
          </div>
        </div>
        <div>
          <span className="text-neutral">{user.fullname}</span>
        </div>
      </div>
    </div>
  );
}

export default User;
