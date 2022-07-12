import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useQuery } from "@apollo/client";
import { LOAD_USERS } from "../GraphQL/Queries";
import {
  setUsers,
  filterByConfirmed,
  filterByNameDescending,
  filterByProcessing,
  filterByFailed,
} from "../features/userSlice";

function Users() {
  const dispatch = useDispatch();
  const { error, loading, data } = useQuery(LOAD_USERS);
  const users = useSelector((state) => state.allUsers.users);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (data) {
      dispatch(setUsers(data.users));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  //Loading spinner
  const spinner = (
    <div className="flex justify-center h-screen">
      <svg
        role="status"
        className="inline w-28 h-28 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600 self-center"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="currentColor"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentFill"
        />
      </svg>
    </div>
  );

  if (error) {
    alert(error.message);
  }

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

  const groupByDate = users.reduce((group, user) => {
    const { date } = user;
    group[date] = group[date] ?? [];
    group[date].push(user);
    return group;
  }, {});

  const DATA = Object.keys(groupByDate).map((dateSingle) => {
    return (
      <div key={dateSingle}>
        <div className="p-1  md:m-2 md:p-5 flex justify-center flex-col font-mono">
          <h4 className="bg-stone-300 w-fit p-2 m-2">{dateSingle}</h4>
          <div>
            {groupByDate[dateSingle].map((user) => {
              const { id, name, transactionType, status } = user;
              return (
                <div key={id}>
                  <div className="flex flex-row justify-center items-center space-x-2 md:space-x-6 p-2">
                    <div className=" bg-lime-100 h-24 w-24 p-5 flex justify-center  ">
                      <div className=" self-center">avi</div>
                    </div>
                    <div className="bg-teal-100 flex-1 p-2 flex flex-row justify-between items-center h-24">
                      <div>
                        <h1>{name}</h1>
                        <h2
                          className={`text-red-600 ${
                            transactionType === "deposit"
                              ? "text-green-500"
                              : ""
                          }`}
                        >
                          {transactionType}
                        </h2>
                      </div>
                      <h3
                        className={`rounded-full px-4 ${
                          status === "confirmed"
                            ? "bg-green-500"
                            : status === "failed"
                            ? "bg-red-600"
                            : "bg-yellow-400"
                        }`}
                      >
                        {status}
                      </h3>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  });

  return (
    <div className="font-mono">
      <div className=" overflow-y-auto h-fit max-h-screen">
        <div className="absolute w-full">
          <div className=" bg-sky-200 p-6 flex flex-row space-x-36 w-full">
            <label htmlFor="search-form" className="md:w-1/2 w-ful">
              <input
                className="h-10 w-full"
                type="search"
                name="search-form"
                placeholder="Search for: 'Name, Status, Type'"
                value={search}
                onChange={filter}
              />
            </label>
            <div className="text-white self-center">{users.length} USERS</div>
          </div>
          <div className="flex flex-row space-x-6 overflow-x-auto items-center">
            <div className="m-2 md:text-xl">Filter By:</div>
            <button
              className="bg-green-400 text-white   px-4 m-2 "
              onClick={() => {
                dispatch(filterByConfirmed());
              }}
            >
              Confirmed
            </button>
            <button
              className="bg-orange-400 text-white   px-4 m-2"
              onClick={() => {
                dispatch(filterByProcessing());
              }}
            >
              pending
            </button>
            <button
              className="bg-red-600 text-white   px-4 m-2"
              onClick={() => {
                dispatch(filterByFailed());
              }}
            >
              Failed
            </button>

            <button
              className="bg-green-400 text-white   px-4 m-2"
              onClick={() => {
                dispatch(filterByNameDescending(data.user));
              }}
            >
              A...Z
            </button>
            <button
              className="bg-green-400 text-white   px-4 m-2"
              onClick={() => {
                setSearch("");
                dispatch(setUsers(data.users));
              }}
            >
              Clear
            </button>
          </div>
        </div>
        {loading ? (
          spinner
        ) : (
          <div className="mt-40 md:mt-36">
            {users.length === 0 ? (
              <h1 className="flex justify-center h-screen items-center">
                No Users
              </h1>
            ) : (
              DATA
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Users;
