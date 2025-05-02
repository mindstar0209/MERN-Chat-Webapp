import React from "react";
import Header from "../components/Header";
import Navbar from "../components/Navbar";

const MainLayout = ({ children }) => {
  return (
    <>
      <div className="flex flex-col items-center w-full">
        <div
          style={{
            width: "65%",
          }}
        >
          <div className="flex flex-col w-full">
            <Header />
            <Navbar />
          </div>
          {children}
        </div>
      </div>
    </>
  );
};

export default MainLayout;
