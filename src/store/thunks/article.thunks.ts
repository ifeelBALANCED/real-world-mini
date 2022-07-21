import { createAsyncThunk } from "@reduxjs/toolkit";

import { CreateCommentFormData } from "@/components/screens/article/components/create-comment/create-comment";
import { EditArticleFormData } from "@/components/screens/edit-article/components/edit-article-form";
import { EditorFormData } from "@/components/screens/editor/components/editor-form";
import { IArticleParams } from "@/components/shared/http";
import articleService from "@/features/articles/article.service";

export const createOneArticle = createAsyncThunk(
  "user-article/create-one",
  async (data: EditorFormData, thunkAPI) => {
    try {
      return await articleService.createArticle(data);
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

export const deleteArticle = createAsyncThunk(
  "article/delete-one",
  async (slug: string, thunkAPI) => {
    try {
      return await articleService.deleteArticle(slug);
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

export const createOneComment = createAsyncThunk(
  "comment/create-one",
  async (
    { data, slug }: { data: CreateCommentFormData; slug: string },
    thunkAPI
  ) => {
    try {
      return await articleService.createComment(data, slug);
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

export const updateOneArticle = createAsyncThunk(
  "article/update-one",
  async (
    { data, slug }: { data: EditArticleFormData; slug: string },
    thunkAPI
  ) => {
    try {
      return await articleService.updateArticle(data, slug);
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

export const deleteOneComment = createAsyncThunk(
  "comment/delete-one",
  async ({ id, slug }: { id: number; slug: string }, thunkAPI) => {
    try {
      return await articleService.deleteComment(id, slug);
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

export const getSingleArticle = createAsyncThunk(
  "user-article/get-one",
  async (slug: string, thunkAPI) => {
    try {
      return await articleService.getArticle(slug);
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

export const likeArticleAll = createAsyncThunk(
  "user-article/like-one",
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

export const dislikeArticleAll = createAsyncThunk(
  "user-article/dislike-one",
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

export const getAllArticles = createAsyncThunk(
  "user-article/get-all",
  async (params: IArticleParams, thunkAPI) => {
    try {
      return await articleService.getAllArticle(params);
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
