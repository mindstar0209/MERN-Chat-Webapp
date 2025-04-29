import React from "react";

function Message({ message }) {
  const authUser = JSON.parse(localStorage.getItem("ChatApp"));
  const itsMe = message.senderId === authUser.user._id;

  const chatName = itsMe ? " chat-end" : "chat-start";
  const chatColor = itsMe ? "bg-cyan-900" : "";

  const createdAt = new Date(message.createdAt);
  const formattedTime = createdAt.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  return (
    <div>
      <div className="px-4 py-1">
        <div className={`chat ${chatName}`}>
          <div
            className={`relative chat-bubble pr-[68px] rounded-md text-white ${chatColor}`}
          >
            {message.message}
            <div className="absolute bottom-2 right-2 chat-footer text-xs text-gray-400">
              {formattedTime}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Message;
