import React from "react";
import UserList from "./Sidebar/UserList";
import ChatPanel from "./ChatPanel/ChatPanel";

export default function Message() {
  return (
    <div className="flex border h-[84vh]">
      <UserList />
      <ChatPanel />
    </div>
  );
}
