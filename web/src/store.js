import { combineReducers, configureStore } from "@reduxjs/toolkit";
import MainPageSlice from "./pages/Main/store";
import UsersPageSlice from "./pages/Users/store";

const reducer = combineReducers({
  MainPageSlice,
  UsersPageSlice,
});

export const store = configureStore({
  reducer: {
    reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
