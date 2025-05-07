import React from "react";
import { useSelector } from "react-redux";

function Message({ message, previousMessage }) {
  const { user } = useSelector(
    (state) => state.conversation.selectedConversation
  );
  const authUser = JSON.parse(localStorage.getItem("Auth"));
  const itsMe = message.senderId === authUser.user._id;

  // Check if previous message exists and is from the same sender
  const showHeader =
    !previousMessage || previousMessage.senderId !== message.senderId;

  const createdAt = new Date(message.createdAt);
  const formattedTime = createdAt.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div
      className={`flex flex-col space-y-1 ${!showHeader ? "mt-2" : " mt-4"}`}
    >
      <div className={"flex justify-start items-start gap-2 max-w-full"}>
        {showHeader && (
          <div className="w-8 h-8 overflow-hidden flex-shrink-0">
            <img
              src={itsMe ? authUser?.user?.profileImage : user?.profileImage}
              alt="avatar"
              className="w-full h-full object-cover"
            />
          </div>
        )}
        {!showHeader && <div className="w-8" />}
        <div className={"flex flex-col items-start max-w-[90%] w-full"}>
          {showHeader && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-info font-bold break-words">
                {itsMe ? authUser?.user?.fullname : user?.fullname}
              </span>
            </div>
          )}
          <div className={`relative rounded-lg break-words w-full`}>
            <div className="flex gap-6 w-full">
              <p className="text-sm whitespace-pre-wrap text-neutral break-words overflow-hidden w-full">
                {message.message}
              </p>
              <span className="text-xs text-gray-500 flex-shrink-0">
                {formattedTime}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Message;
