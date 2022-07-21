import { createAsyncThunk } from "@reduxjs/toolkit";

import profileService from "@/features/profile/profile.service";

export const getUsersSettings = createAsyncThunk(
  "user/get-profile",
  async (_, thunkAPI) => {
    try {
      return await profileService.getSettings();
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

export const getUserProfileByUsername = createAsyncThunk(
  "user/get-profile-by-username",
  async (username: string, thunkAPI) => {
    try {
      return await profileService.getUserProfileByUsername(username);
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

export const followProfile = createAsyncThunk(
  "user/followProfile",
  async (username: string, thunkAPI) => {
    try {
      return await profileService.followUserProfile(username);
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

export const unfollowProfile = createAsyncThunk(
  "user/unfollowProfile",
  async (username: string, thunkAPI) => {
    try {
      return await profileService.unfollowUserProfile(username);
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
