import { AnyAction, createSlice } from "@reduxjs/toolkit";

import {
  followProfile,
  getUserProfileByUsername,
  getUsersSettings,
  unfollowProfile,
} from "@/store/thunks/profile.thunks";
import { ProfileState } from "@/types/types";

const initialState: ProfileState = {
  userInfo: null,
  profile: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const profileSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getUsersSettings.pending, state => {
        state.isLoading = true;
      })
      .addCase(
        getUsersSettings.fulfilled,
        (state: ProfileState, action: AnyAction) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.userInfo = action.payload;
        }
      )
      .addCase(
        getUsersSettings.rejected,
        (state: ProfileState, action: AnyAction) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
          state.userInfo = null;
        }
      )
      .addCase(getUserProfileByUsername.pending, state => {
        state.isLoading = true;
      })
      .addCase(
        getUserProfileByUsername.fulfilled,
        (state: ProfileState, action: AnyAction) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.profile = action.payload;
        }
      )
      .addCase(
        getUserProfileByUsername.rejected,
        (state: ProfileState, action: AnyAction) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
          state.profile = null;
        }
      )

      //////////////////////////////// follow profile
      .addCase(followProfile.pending, state => {
        state.isLoading = true;
      })
      .addCase(
        followProfile.fulfilled,
        (state: ProfileState, action: AnyAction) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.profile = action.payload;
        }
      )
      .addCase(
        followProfile.rejected,
        (state: ProfileState, action: AnyAction) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
          state.profile = null;
        }
      )

      //////////////////////////////// unfollow profile
      .addCase(unfollowProfile.pending, state => {
        state.isLoading = true;
      })
      .addCase(
        unfollowProfile.fulfilled,
        (state: ProfileState, action: AnyAction) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.profile = action.payload;
        }
      )
      .addCase(
        unfollowProfile.rejected,
        (state: ProfileState, action: AnyAction) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
          state.profile = null;
        }
      );
  },
});

export default profileSlice.reducer;
