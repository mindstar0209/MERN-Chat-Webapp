import React, { useEffect } from "react";
import Chatuser from "./Chatuser.jsx";
import Messages from "./Messages.jsx";
import Typesend from "./Typesend.jsx";
import useConversation from "../../../context/useConversation.js";
import { useAuth } from "../../../context/AuthProvider.jsx";
import { CiMenuFries } from "react-icons/ci";

function ChatPanel() {
  const { selectedConversation, setSelectedConversation } = useConversation();
  useEffect(() => {
    return setSelectedConversation(null);
  }, [setSelectedConversation]);
  return (
    <div className="border-l text-gray-300" style={{ width: "70%" }}>
      <div>
        {!selectedConversation ? (
          <NoChatSelected />
        ) : (
          <>
            {/* <Chatuser /> */}
            <div
              className=" flex-1 overflow-y-auto"
              style={{ maxHeight: "77vh" }}
            >
              <Messages />
            </div>
            <Typesend />
          </>
        )}
      </div>
    </div>
  );
}

export default ChatPanel;

const NoChatSelected = () => {
  const [authUser] = useAuth();
  console.log(authUser);
  return (
    <>
      <div className="relative">
        <label
          htmlFor="my-drawer-2"
          className="btn btn-ghost drawer-button lg:hidden absolute left-5"
        >
          <CiMenuFries className="text-white text-xl" />
        </label>
        <div className="flex items-center justify-center">
          <h1 className="text-center">
            Welcome{" "}
            <span className="font-semibold text-xl">
              {authUser.user.fullname}
            </span>
            <br />
            No chat selected, please start conversation by selecting anyone to
            your contacts
          </h1>
        </div>
      </div>
    </>
  );
};
