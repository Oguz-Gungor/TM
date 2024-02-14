import { createSlice } from "@reduxjs/toolkit";
import Admin from "../../request/api/Admin";
import { asyncThunkWrapper } from "../../utils/AsyncThunkExtractor";

export const GetUsers = asyncThunkWrapper("users", Admin.All);

const UsersPageSlice = createSlice({
  name: "UsersPageSlice",
  initialState: { users: null },
  extraReducers: (builder) => {
    builder.addCase(GetUsers.fulfilled, (state, { payload }) => {
      state.users = payload;
    });
  },
});

export default UsersPageSlice.reducer;
