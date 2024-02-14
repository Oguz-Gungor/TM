import { createSlice } from "@reduxjs/toolkit";
import Resources from "../../request/api/Resources";
import { asyncThunkWrapper } from "../../utils/AsyncThunkExtractor";

export const GetInfo = asyncThunkWrapper("info", Resources.Info);

const MainPageSlice = createSlice({
  name: "MainPageSlice",
  initialState: { userInfo: null },
  extraReducers: (builder) => {
    builder.addCase(GetInfo.fulfilled, (state, { payload }) => {
      state.userInfo = payload;
    });
  },
});

export default MainPageSlice.reducer;
