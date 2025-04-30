import React from "react";
import Logout from "../home/left1/Logout";
import Left from "../home/Leftpart/Left";
import Right from "../home/Rightpart/Right";

export default function Message() {
  return (
    <div className="flex h-screen">
      <Logout />
      <Left />
      <Right />
    </div>
  );
}
