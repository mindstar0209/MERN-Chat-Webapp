import React from "react";
import SearchBar from "./SearchBar";
import Users from "./Users";

function UserList() {
  return (
    <div className="min-w-[30%] text-gray-300">
      <SearchBar />
      <div
        className=" flex-1  overflow-y-auto"
        style={{ minHeight: "calc(84vh - 10vh)" }}
      >
        <Users />
      </div>
    </div>
  );
}

export default UserList;
