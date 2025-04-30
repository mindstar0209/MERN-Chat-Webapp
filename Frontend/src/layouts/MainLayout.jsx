import React from "react";
import Logout from "../home/left1/Logout";
import Left from "../home/Leftpart/Left";
import Right from "../home/Rightpart/Right";

const MainLayout = ({ children }) => {
  return (
    <div className="flex h-screen">
      <Logout />
      <Left />
      <Right />
    </div>
  );
};

export default MainLayout;
