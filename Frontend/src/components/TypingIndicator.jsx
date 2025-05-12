import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useSocketContext } from "../context/SocketContext";

function TypingIndicator() {
  const [isTyping, setIsTyping] = useState(false);
  const { socket } = useSocketContext();
  const { user } = useSelector(
    (state) => state.conversation.selectedConversation
  );
  const authUser = JSON.parse(localStorage.getItem("Auth"));

  useEffect(() => {
    if (!socket || !user) return;

    const handleTyping = (data) => {
      if (data.senderId === user._id) {
        setIsTyping(true);
      }
    };

    const handleStopTyping = (data) => {
      if (data.senderId === user._id) {
        setIsTyping(false);
      }
    };

    socket.on("userTyping", handleTyping);
    socket.on("userStoppedTyping", handleStopTyping);

    return () => {
      socket.off("userTyping", handleTyping);
      socket.off("userStoppedTyping", handleStopTyping);
    };
  }, [socket, user]);

  if (!isTyping) return null;

  return <div className="text-xs text-info italic">typing ...</div>;
}

export default TypingIndicator;
