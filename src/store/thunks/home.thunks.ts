import { createAsyncThunk } from "@reduxjs/toolkit";

import { HomeParams } from "@/components/shared/http";
import articleService from "@/features/articles/article.service";
import homeService from "@/features/home/home.service";

export const getCurrentUserFeed = createAsyncThunk(
  "user/get-feed",
  async (params: HomeParams, thunkAPI) => {
    try {
      return await homeService.getUserFeed(params);
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

export const getTags = createAsyncThunk(
  "home/get-tags",
  async (_, thunkAPI) => {
    try {
      return await homeService.getHomeTags();
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

export const likeArticleFeed = createAsyncThunk(
  "home/like-one",
  async (slug: string, thunkAPI) => {
    try {
      return await articleService.favoriteArticle(slug);
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

export const dislikeArticleFeed = createAsyncThunk(
  "home/dislike-one",
  async (slug: string, thunkAPI) => {
    try {
      return await articleService.unfavoriteArticle(slug);
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
