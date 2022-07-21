import { AnyAction, createSlice } from "@reduxjs/toolkit";

import {
  dislikeArticleFeed,
  getCurrentUserFeed,
  getTags,
  likeArticleFeed,
} from "@/store/thunks/home.thunks";
import { HomeState } from "@/types/types";

const initialState: HomeState = {
  feed: { articles: [], articlesCount: 0 },
  tags: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const dogSlice = createSlice({
  name: "home",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getCurrentUserFeed.pending, state => {
        state.isLoading = true;
      })
      .addCase(
        getCurrentUserFeed.fulfilled,
        (state: HomeState, action: AnyAction) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.feed = action.payload;
        }
      )
      .addCase(
        getCurrentUserFeed.rejected,
        (state: HomeState, action: AnyAction) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
          state.feed = { articles: [], articlesCount: 0 };
        }
      )
      .addCase(getTags.pending, state => {
        state.isLoading = true;
      })
      .addCase(getTags.fulfilled, (state: HomeState, action: AnyAction) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.tags = action.payload;
      })

      .addCase(getTags.rejected, (state: HomeState, action: AnyAction) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.tags = null;
      })
      .addCase(
        likeArticleFeed.fulfilled,
        (state: HomeState, action: AnyAction) => {
          state.isLoading = false;
          state.isSuccess = true;
          console.log("home state action", action);
          state.feed.articles = state?.feed.articles?.map(article => {
            if (article.slug === action.payload.article.slug) {
              return {
                ...article,
                favorited: true,
                favoritesCount: action.payload.article.favoritesCount,
              };
            }
            return article;
          });
        }
      )
      .addCase(
        dislikeArticleFeed.fulfilled,
        (state: HomeState, action: AnyAction) => {
          state.isLoading = false;
          state.isSuccess = true;
          console.log("home state dislike action", action);
          state.feed.articles = state?.feed.articles?.map(article => {
            if (article.slug === action.payload.article.slug) {
              return {
                ...article,
                favorited: false,
                favoritesCount: action.payload.article.favoritesCount,
              };
            }
            return article;
          });
        }
      );
  },
});

export default dogSlice.reducer;
