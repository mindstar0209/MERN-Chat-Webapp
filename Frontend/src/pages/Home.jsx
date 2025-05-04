import React from "react";
import useGetAllUsers from "../context/useGetAllUsers";
import { Link, useNavigate } from "react-router-dom";

export default function Home() {
  const [allUsers, loading] = useGetAllUsers();
  const navigate = useNavigate();
  const defaultAvatar =
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";

  const calculateAge = (birthday) => {
    if (!birthday) return "";
    const birthDate = new Date(birthday);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const UserCard = ({ user }) => {
    return (
      <div
        className="card shadow-sm border flex flex-row gap-4 cursor-pointer"
        onClick={() => navigate(`/profile/${user.username}`)}
      >
        <div className="flex flex-row gap-2">
          <div className="min-w-32 min-h-32 h-32 w-32">
            <img
              src={user.profileImage || defaultAvatar}
              alt={user.fullname}
              className="w-full h-full object-cover rounded-l-md"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = defaultAvatar;
              }}
            />
          </div>
          <div className="flex flex-col p-2 gap-2">
            <div className="text-xl font-semibold line-clamp-1">
              {user.fullname ? user.fullname : "Guest User"}
            </div>
            <div className="text-sm flex gap-2">
              {user.gender?.charAt(0).toUpperCase() + user.gender?.slice(1)}
              {user.birthday && <>, {calculateAge(user.birthday)}</>}
              {user.country && (
                <>
                  <div className={"flex items-center"}>
                    <img
                      src={`https://flagcdn.com/w20/${user.country.toLowerCase()}.png`}
                      alt={user.country}
                      className="border inline-block"
                    />
                  </div>
                </>
              )}
            </div>
            <div className="text-sm text-gray-500 line-clamp-2">
              {user.summary ? user.summary : "No Description"}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="flex flex-col gap-4 p-4">
        <div className="flex justify-end gap-2">
          Search: <div className="border w-60"></div>
        </div>
        <div className="grid grid-cols-3 gap-4">
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
