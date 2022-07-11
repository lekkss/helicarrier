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

  if (loading) {
    return <h1>Loading</h1>;
  }
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
        <div className="mt-40 md:mt-36">
          {users.length === 0 ? (
            <h1 className="flex justify-center h-screen items-center">
              No Users
            </h1>
          ) : (
            DATA
          )}
        </div>
      </div>
    </div>
  );
}

export default Users;
