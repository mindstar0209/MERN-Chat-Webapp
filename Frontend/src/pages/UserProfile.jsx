import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axios";
import { useNavigate, useParams } from "react-router-dom";
import { countries } from "countries-list";
import ISO6391 from "iso-639-1";
import { useSelector, useDispatch } from "react-redux";
import {
  setSelectedConversationUser,
  setStartConversationUser,
  setUsers,
} from "../features/conversation/conversationSlice";

export default function UserProfile() {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (username) {
      axiosInstance
        .get(`/user/profile/${username}`)
        .then((res) => {
          setUser(res.data);
        })
        .catch((err) => {
          setUser(null);
        })
        .finally(() => setLoading(false));
    }
  }, [username]);

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

  function getCountryName(code) {
    if (!code) return "";
    return countries[code]?.name || code;
  }

  function getLanguageName(code) {
    if (!code) return "";
    return ISO6391.getName(code) || code;
  }

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>User not found.</div>;

  const handleMessageClick = async () => {
    // const filteredUsers = chatUsers.filter((u) => u._id !== user._id);
    // dispatch(setUsers([user, ...filteredUsers]));
    dispatch(setSelectedConversationUser(user));
    navigate("/message");
  };

  return (
    <div className="flex flex-col px-40 py-10 items-center gap-6">
      <div className="flex justify-center gap-12 w-full">
        <div className="flex flex-col">
          <img
            src={user.profileImage}
            alt="Profile"
            className="w-40 h-40 min-w-40 min-h-40 object-cover rounded-md"
            title="Click to change image"
          />
        </div>
        <div className="w-full flex items-center">
          <div className="flex flex-col gap-2">
            <div className="flex items-end gap-4">
              <div className="text-2xl font-bold">{user?.fullname}</div>
              <div className="text-base text-info italic">
                @{user?.username}
              </div>
            </div>
            <div className="text-base">
              {user?.gender?.charAt(0).toUpperCase() + user?.gender?.slice(1)}
              {user?.birthday && <>, {calculateAge(user.birthday)}</>}
              {user?.country && (
                <>
                  , {getCountryName(user.country)}{" "}
                  <img
                    src={`https://flagcdn.com/w20/${user.country.toLowerCase()}.png`}
                    alt={user.country}
                    className="border inline-block"
                  />
                </>
              )}
            </div>
            <div className="text-base text-gray-500 italic">
              {user?.occupation}
            </div>
            <button
              className="btn btn-info px-6 text-white w-max"
              onClick={handleMessageClick}
            >
              Message
            </button>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col gap-6">
        <div>
          <div className="text-info font-semibold text-lg divider divider-vertical divider-start divider-info">
            Summary
          </div>
          <div className="text-sm text-gray-500">
            {user?.summary ? user.summary : "No Summary"}
          </div>
        </div>

        <div>
          <div className="text-info font-semibold text-lg divider divider-vertical divider-start divider-info">
            Hobbies
          </div>
          <div className="text-sm text-gray-500">
            {user?.hobbies ? user.hobbies : "No Hobbies"}
          </div>
        </div>

        <div>
          <div className="text-info font-semibold text-lg divider divider-vertical divider-start divider-info">
            Language
          </div>
          <div className="text-sm text-gray-500">
            {user?.nation && <> {getLanguageName(user.nation)}</>}
          </div>
        </div>
      </div>
    </div>
  );
}
