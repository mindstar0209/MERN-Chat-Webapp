import React, { useState } from "react";
import { IoSend } from "react-icons/io5";
import useSendMessage from "../../../context/useSendMessage.js";

function Typesend() {
  const [message, setMessage] = useState("");
  const { loading, sendMessages } = useSendMessage();

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessages(message);
    setMessage("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex space-x-1 bg-stone-200 p-2">
        <label className="input border h-10 outline-none w-full">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="border text-neutral"
          />
        </label>
      </div>
    </form>
  );
}

export default Typesend;
