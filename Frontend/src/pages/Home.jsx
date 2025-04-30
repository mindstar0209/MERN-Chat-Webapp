import React from "react";
import useGetAllUsers from "../context/useGetAllUsers";

export default function Home() {
  const [allUsers, loading] = useGetAllUsers();
  const defaultAvatar =
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";

  const UserCard = ({ user }) => {
    return (
      <div className="flex flex-row border gap-4">
        <div className="border min-w-32 min-h-32 h-32 w-32">
          <img
            src={user.profileImage || defaultAvatar}
            alt={user.fullname}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = defaultAvatar;
            }}
          />
        </div>
        <div className="flex flex-col">
          <div className="text-base">{user.fullname}</div>
          <div className="text-sm text-gray-500">{user.email}</div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div
        className="border flex flex-col gap-4 p-4"
        style={{ height: "100vh" }}
      >
        <div className="flex justify-end gap-2">
          Search: <div className="border w-60"></div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {loading ? (
            <div>Loading...</div>
          ) : (
            allUsers?.map((user) => <UserCard key={user._id} user={user} />)
          )}
        </div>
      </div>
    </>
  );
}
