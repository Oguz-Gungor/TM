import { combineReducers, configureStore } from "@reduxjs/toolkit";
import MainPageSlice from "./pages/Main/store";

const reducer = combineReducers({
    MainPageSlice,
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
