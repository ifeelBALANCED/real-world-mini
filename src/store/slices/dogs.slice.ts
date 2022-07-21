import { AnyAction, createSlice } from "@reduxjs/toolkit";

import { createDog, deleteDog } from "@/store/thunks/dog.thunks";
import { getAllDogs } from "@/store/thunks/dogs.thunks";
import { DogsState } from "@/types/types";

const initialState: DogsState = {
  dogs: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const dogsSlice = createSlice({
  name: "dogs",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(
        getAllDogs.pending || createDog.pending || deleteDog.pending,
        state => {
          state.isLoading = true;
        }
      )
      .addCase(getAllDogs.fulfilled, (state: DogsState, action: AnyAction) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.dogs = action.payload;
      })
      .addCase(createDog.fulfilled, (state: DogsState, action: AnyAction) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.dogs?.push(action.payload);
      })
      .addCase(deleteDog.fulfilled, (state: DogsState, action: AnyAction) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.dogs?.splice(
          state.dogs?.findIndex(({ id }) => id === action.payload.id),
          1
        );
      })
      .addCase(
        getAllDogs.rejected || createDog.rejected || deleteDog.pending,
        (state: DogsState, action: AnyAction) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
          state.dogs = null;
        }
      );
  },
});

export default dogsSlice.reducer;
