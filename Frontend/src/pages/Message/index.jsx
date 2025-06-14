import React, { useEffect } from "react";
import UserList from "./Sidebar/UserList";
import ChatPanel from "./ChatPanel/ChatPanel";
import useGetChatUsers from "../../context/userGetChatUsers";
import { useDispatch, useSelector } from "react-redux";
import { clearMessages } from "../../features/conversation/conversationSlice";

export default function Message() {
  const getChatUsers = useGetChatUsers();
  const dispatch = useDispatch();
  const { enterCount } = useSelector(
    (state) => state.conversation.selectedConversation
  );

  console.log("enterCount:", enterCount);

  useEffect(() => {
    getChatUsers();

    // return () => {
    //   dispatch(clearMessages());
    // };
  }, [dispatch, enterCount]);

  return (
    <div className="flex">
      <UserList />
      <ChatPanel />
    </div>
  );
}
