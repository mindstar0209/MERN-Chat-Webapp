import React, { useState, useRef, useEffect } from "react";
import { IoSend } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import useSendMessage from "../../../context/useSendMessage";
import {
  setEnterCount,
  setUsers,
} from "../../../features/conversation/conversationSlice";
import axiosInstance from "../../../utils/axios";
import useGetChatUsers from "../../../context/userGetChatUsers";
import { useSocketContext } from "../../../context/SocketContext";

function Typesend() {
  const dispatch = useDispatch();
  const { socket } = useSocketContext();
  const { enterCount } = useSelector(
    (state) => state.conversation.selectedConversation
  );
  const { user } = useSelector(
    (state) => state.conversation.selectedConversation
  );
  const [message, setMessage] = useState("");
  const { loading, sendMessages } = useSendMessage();
  const textareaRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  const handleTyping = () => {
    if (socket && user) {
      socket.emit("typing", { receiverId: user._id });

      // Clear previous timeout
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }

      // Set new timeout to stop typing indicator after 2 seconds of no typing
      typingTimeoutRef.current = setTimeout(() => {
        socket.emit("stopTyping", { receiverId: user._id });
      }, 2000);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    sendMessages(message);
    setMessage("");

    dispatch(setEnterCount(enterCount + 1));

    if (textareaRef.current) {
      textareaRef.current.style.height = "40px";
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex space-x-1 h-[55px]">
        <div className="relative w-full h-full">
          {/* User is typing */}
          <div className="bg-stone-200 p-2 absolute bottom-0 left-0 w-full flex">
            <textarea
              ref={textareaRef}
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
                handleTyping();
              }}
              onKeyDown={handleKeyDown}
              className="w-full border rounded-[4px] p-2 text-neutral resize-none min-h-[40px] max-h-[120px] focus:outline-none "
              rows={1}
              style={{
                overflow: "hidden",
                height: "auto",
              }}
              onInput={(e) => {
                e.target.style.height = "auto";
                e.target.style.height =
                  Math.min(e.target.scrollHeight, 120) + "px";
              }}
            />
          </div>
        </div>
      </div>
    </form>
  );
}

export default Typesend;
