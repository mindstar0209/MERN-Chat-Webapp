import React, { useEffect } from "react";
import Messages from "./Messages.jsx";
import Typesend from "./Typesend.jsx";
import { CiMenuFries } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedConversationUser } from "../../../features/conversation/conversationSlice.js";
import { useNavigate } from "react-router-dom";

function ChatPanel() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const selectedConversation = useSelector(
    (state) => state.conversation.selectedConversation
  );
  const { user } = selectedConversation || {};

  useEffect(() => {
    return () => dispatch(setSelectedConversationUser(null));
  }, [dispatch]);

  return (
    <div className="border-l text-gray-300" style={{ width: "70%" }}>
      <div>
        {user ? (
          <div className="w-full flex items-center gap-2 p-2 border-b">
            <div className="w-[40px] h-[40px] overflow-hidden flex-shrink-0">
              <img
                src={user?.profileImage}
                alt="avatar"
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <div
              className="text-black text-base hover:underline cursor-pointer"
              onClick={() => navigate(`/profile/${user?.username}`)}
            >
              {user?.fullname}
            </div>
          </div>
        ) : (
          <div className="w-full h-[57px] border-b"></div>
        )}
        <div className=" flex-1 overflow-y-auto min-h-[calc(77vh-52px)]">
          {/* {!user ? <NoChatSelected /> : <Messages />} */}
          <Messages />
        </div>
        <Typesend />
      </div>
    </div>
  );
}

export default ChatPanel;

const NoChatSelected = () => {
  const authUser = useSelector((state) => state.auth.user);

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
              {authUser?.user?.fullname}
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
