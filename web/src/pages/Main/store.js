import { createSlice } from "@reduxjs/toolkit";
import Resources from "../../request/api/Resources";
import { asyncThunkWrapper } from "../../utils/AsyncThunkExtractor";

export const GetInfo = asyncThunkWrapper("info", Resources.Info);

const MainPageSlice = createSlice({
  name: "MainPageSlice",
  initialState: { userInfo: null },
  reducers: {
    updateUser: (state, { payload }) => {
      state.userInfo = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(GetInfo.fulfilled, (state, { payload }) => {
      state.userInfo = payload;
    });
  },
});

export const { updateUser } = MainPageSlice.actions;

export default MainPageSlice.reducer;
