import React from "react";
import Header from "../components/Header";

export default function AuthLayout({ children }) {
  return (
    <>
      <div className="flex flex-col items-center w-full bg-[#f9fcff]">
        <div className="w-[65%] bg-white">
          <div className="flex flex-col w-full">
            <Header />
          </div>
          <div className="border-x">{children}</div>
        </div>
      </div>
    </>
  );
}
