import React, { useEffect, useRef } from "react";
import Message from "./Message";
import useGetMessage from "../../../context/useGetMessage";
import Loading from "../../../components/Loading.jsx";
import useGetSocketMessage from "../../../context/useGetSocketMessage";
import { useSelector } from "react-redux";
function Messages() {
  const { loading, messages } = useGetMessage();

  useGetSocketMessage();

  const lastMsgRef = useRef();
  useEffect(() => {
    setTimeout(() => {
      if (lastMsgRef.current) {
        lastMsgRef.current.scrollIntoView({
          behavior: "smooth",
        });
      }
    }, 100);
  }, [messages]);

  return (
    <div className="overflow-y-auto pb-4 px-[10%] flex flex-col min-h-[calc(77vh-52px)]">
      {loading ? (
        <Loading />
      ) : (
        messages.length > 0 &&
        messages.map((message, index) => (
          <div key={message._id} ref={lastMsgRef}>
            <Message
              key={message._id}
              message={message}
              previousMessage={index > 0 ? messages[index - 1] : null}
            />
          </div>
        ))
      )}

      {!loading && messages.length === 0 && (
        <div>
          <p className="text-center mt-[20%]">
            Say! Hi to start the conversation
          </p>
        </div>
      )}
    </div>
  );
}

export default Messages;
