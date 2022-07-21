import { AnyAction, createSlice } from "@reduxjs/toolkit";

import { getOneDog } from "@/store/thunks/dog.thunks";
import { DogState } from "@/types/types";

const initialState: DogState = {
  dog: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const dogSlice = createSlice({
  name: "single-dog",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getOneDog.pending, state => {
        state.isLoading = true;
      })
      .addCase(getOneDog.fulfilled, (state: DogState, action: AnyAction) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.dog = action.payload;
      })
      .addCase(getOneDog.rejected, (state: DogState, action: AnyAction) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.dog = null;
      });
  },
});

export default dogSlice.reducer;
