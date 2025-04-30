import React from "react";
import icon from "../assets/icon.png";

export default function Header() {
  return (
    <>
      <div className="flex items-center w-full h-[100px] border">
        <div className="w-[80px]">
          <img src={icon} />
        </div>
      </div>
    </>
  );
}
