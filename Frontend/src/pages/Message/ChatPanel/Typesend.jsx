import React, { useState, useRef } from "react";
import { IoSend } from "react-icons/io5";
import useSendMessage from "../../../context/useSendMessage.js";

function Typesend() {
  const [message, setMessage] = useState("");
  const { loading, sendMessages } = useSendMessage();
  const textareaRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    sendMessages(message);
    setMessage("");

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
          <div className="bg-stone-200 p-2 absolute bottom-0 left-0 w-full">
            <textarea
              ref={textareaRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
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
