import { createAsyncThunk } from "@reduxjs/toolkit";

export const asyncThunkWrapper = (action, handler) =>
  createAsyncThunk(action, async (params, { rejectWithValue }) => {
    try {
      const response = await handler(params);
      return response.data;
    } catch (error) {
      error(rejectWithValue);
    }
  });
