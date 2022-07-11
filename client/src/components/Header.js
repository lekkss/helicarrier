import React from "react";
import { useSelector } from "react-redux";
import { setUsers } from "../features/userSlice";

function Header() {
  const users = useSelector((state) => state.allUsers.users);

  // SEARCH
  const filter = (e) => {
    let keyword = e.target.value;
    const keys = ["name", "status", "transactionType"];
    if (e.target.value === "") {
      dispatch(setUsers(data.users));
    }
    const r = data.users.filter((user) =>
      keys.some((key) =>
        user[key].toLowerCase().includes(keyword.toLowerCase())
      )
    );
    setSearch(keyword);

    dispatch(setUsers(r));
  };

  return (
    <div className=" bg-gray-500 p-6 flex flex-row space-x-36 w-full">
      <label htmlFor="search-form" className="w-1/2">
        <input
          className="h-10 w-full"
          type="search"
          name="search-form"
          placeholder="Search for: 'Name, Status, Type'"
          value={search}
          onChange={filter}
        />

        {/* <button
  className="bg-green-400 text-white rounded-md  px-4"
  onClick={() => {
    if (!search) {
      return;
    }
    console.log(search);
    dispatch(filterUsers(search));
  }}
>
  search
</button> */}
      </label>
      <div className="text-white">{users.length} USERS</div>
    </div>
  );
}

export default Header;
