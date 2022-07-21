import { AnyAction, createSlice } from "@reduxjs/toolkit";

import {
  createOneArticle,
  createOneComment,
  deleteArticle,
  deleteOneComment,
  dislikeArticleAll,
  getAllArticles,
  getSingleArticle,
  likeArticleAll,
} from "@/store/thunks/article.thunks";
import { ArticlesState } from "@/types/types";

const initialState: ArticlesState = {
  articles: { articles: [] },
  singleArticle: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const articlesSlice = createSlice({
  name: "article",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(createOneArticle.pending, state => {
        state.isLoading = true;
      })
      .addCase(deleteArticle.pending, state => {
        state.isLoading = true;
      })
      .addCase(getSingleArticle.pending, state => {
        state.isLoading = true;
      })
      .addCase(getAllArticles.pending, state => {
        state.isLoading = true;
      })
      .addCase(likeArticleAll.pending, state => {
        state.isLoading = true;
      })
      .addCase(dislikeArticleAll.pending, state => {
        state.isLoading = true;
      })
      .addCase(
        deleteArticle.fulfilled,
        (state: ArticlesState, action: AnyAction) => {
          state.isLoading = false;
          state.isSuccess = true;
          const articleIndex = state?.articles?.articles?.findIndex(
            article => article?.slug === action?.payload?.slug
          );
          state?.articles?.articles.splice(articleIndex, 1);
        }
      )
      .addCase(
        likeArticleAll.fulfilled,
        (state: ArticlesState, action: AnyAction) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.articles.articles = state.articles?.articles?.map(article => {
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
        dislikeArticleAll.fulfilled,
        (state: ArticlesState, action: AnyAction) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.articles.articles = state.articles?.articles?.map(article => {
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
      )
      .addCase(
        getSingleArticle.fulfilled,
        (state: ArticlesState, action: AnyAction) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.singleArticle = action.payload;
        }
      )
      .addCase(
        getAllArticles.fulfilled,
        (state: ArticlesState, action: AnyAction) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.articles = action.payload;
        }
      )
      .addCase(
        createOneComment.fulfilled,
        (state: ArticlesState, action: AnyAction) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.singleArticle
            ? (state.singleArticle.article.comments =
                action.payload.article.comments)
            : null;
        }
      )
      .addCase(
        deleteOneComment.fulfilled,
        (state: ArticlesState, action: AnyAction) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.singleArticle
            ? state.singleArticle?.article?.comments?.splice(
                state.singleArticle?.article?.comments?.findIndex(
                  singleArticle => singleArticle?.id === action?.payload?.id
                ),
                1
              )
            : null;
        }
      )
      .addCase(
        getSingleArticle.rejected,
        (state: ArticlesState, action: AnyAction) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
        }
      )
      .addCase(
        deleteArticle.rejected,
        (state: ArticlesState, action: AnyAction) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
        }
      )
      .addCase(
        getAllArticles.rejected,
        (state: ArticlesState, action: AnyAction) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
        }
      )
      .addCase(
        createOneArticle.rejected,
        (state: ArticlesState, action: AnyAction) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
        }
      )
      .addCase(
        createOneComment.rejected,
        (state: ArticlesState, action: AnyAction) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
        }
      )
      .addCase(
        deleteOneComment.rejected,
        (state: ArticlesState, action: AnyAction) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
        }
      )
      .addCase(
        likeArticleAll.rejected,
        (state: ArticlesState, action: AnyAction) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
        }
      )
      .addCase(
        dislikeArticleAll.rejected,
        (state: ArticlesState, action: AnyAction) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
        }
      );
  },
});

export default articlesSlice.reducer;
