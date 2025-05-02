import React, { useState } from "react";
import { Search } from "lucide-react";
import useGetAllUsers from "../../../context/useGetAllUsers";
import useConversation from "../../../context/useConversation";
import toast from "react-hot-toast";
function SearchBar() {
  const [search, setSearch] = useState("");
  const [allUsers] = useGetAllUsers();
  const { setSelectedConversation } = useConversation();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) return;
    const conversation = allUsers.find((user) =>
      user.fullname?.toLowerCase().includes(search.toLowerCase())
    );
    if (conversation) {
      setSelectedConversation(conversation);
      setSearch("");
    } else {
      toast.error("User not found");
    }
  };
  return (
    <div className="px-2 py-2">
      <form onSubmit={handleSubmit}>
        <div className="flex space-x-3">
          <label className="input h-8">
            <Search className="h-4 opacity-50" />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search"
              className="text-neutral"
            />
          </label>
        </div>
      </form>
    </div>
  );
}

export default SearchBar;
