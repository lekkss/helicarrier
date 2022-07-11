import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
};
export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.users = [...action.payload];
    },
    filterUsers: (state, action) => {
      state.users = state.users.filter(
        (user) =>
          user.name.toLowerCase().includes(action.payload.toLowerCase()) ||
          user.status.toLowerCase().includes(action.payload.toLowerCase())
      );
    },
    filterByConfirmed: (state) => {
      state.users = state.users.filter((user) => user.status === "confirmed");
    },
    filterByProcessing: (state) => {
      state.users = state.users.filter((user) => user.status === "pending");
    },
    filterByFailed: (state) => {
      state.users = state.users.filter((user) => user.status === "failed");
    },
    filterByNameDescending: (state) => {
      state.users = [...state.users].sort((a, b) =>
        a.name.localeCompare(b.name)
      );
    },
  },
});

export const {
  setUsers,
  filterUsers,
  filterByConfirmed,
  filterByNameDescending,
  filterByProcessing,
  filterByFailed,
} = userSlice.actions;

export default userSlice.reducer;
