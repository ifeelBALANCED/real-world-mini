import { createAsyncThunk } from "@reduxjs/toolkit";

import dogsService from "@/features/dogs/dogs.service";

export const getAllDogs = createAsyncThunk(
  "dogs/get-list",
  async (_, thunkAPI) => {
    try {
      return await dogsService.getDogsList();
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.rejectWithValue(message);
    }
  }
);
