import React from "react";
import FavIcon from "../assets/favicon.svg";

export default function Header() {
  return (
    <>
      <div className="flex bg-[#19b5fe] p-6 items-center w-full h-[12vh] gap-4">
        <div className="w-[70px]">
          <img src={FavIcon} alt="icon" />
        </div>
        <div>
          <div className="text-3xl font-extrabold text-white">WorldPals</div>
          <div className="text-white">Meet the world friends</div>
        </div>
      </div>
    </>
  );
}
