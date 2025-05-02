import React from "react";
import User from "./User";
import useGetAllUsers from "../../../context/useGetAllUsers";

function Users() {
  const [allUsers, loading] = useGetAllUsers();

  return (
    <div>
      <div className="border flex-1 overflow-y-auto max-h-[78vh]">
        {allUsers.map((user, index) => (
          <User key={index} user={user} />
        ))}
      </div>
    </div>
  );
}

export default Users;
