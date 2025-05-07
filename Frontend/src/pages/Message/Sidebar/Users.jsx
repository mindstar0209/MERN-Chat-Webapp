import React, { useEffect } from "react";
import User from "./User";
import { useSelector } from "react-redux";

function Users() {
  const { users } = useSelector((state) => state.conversation);

  return (
    <div>
      <div className="flex-1 border-t overflow-y-auto max-h-[78vh]">
        {users && users.map((user, index) => <User key={index} user={user} />)}
      </div>
    </div>
  );
}

export default Users;
