import React from "react";
import Header from "../components/Header";
import Navbar from "../components/Navbar";

const MainLayout = ({ children }) => {
  return (
    <>
      <div className="flex flex-col items-center w-full bg-[#f9f9fa]">
        <div className="w-[65%] bg-white">
          <div className="flex flex-col w-full">
            <Header />
            <Navbar />
          </div>
          <div className="border-x h-full min-h-[calc(88vh-30px)]">
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default MainLayout;
