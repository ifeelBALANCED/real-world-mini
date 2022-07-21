import { createAsyncThunk } from "@reduxjs/toolkit";

import { CreateDogFormData } from "@/components/screens/create-dog/components/create-dog-form";
import { UpdateDogFormData } from "@/components/screens/dog/components/edit-dog-form";
import dogsService from "@/features/dogs/dogs.service";

type UpdateData = {
  id: string;
  data: UpdateDogFormData;
};

export const getOneDog = createAsyncThunk(
  "dogs/get-one",
  async (id: string, thunkAPI) => {
    try {
      return await dogsService.getDogById(id);
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

export const deleteDog = createAsyncThunk(
  "dogs/delete-one",
  async (id: string, thunkAPI) => {
    try {
      return await dogsService.deleteOneDog(id);
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

export const updateDog = createAsyncThunk(
  "dogs/update-one",
  async ({ data, id }: UpdateData, thunkAPI) => {
    try {
      return await dogsService.updateOneDog(data, id);
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

export const createDog = createAsyncThunk(
  "dogs/create-one",
  async (data: CreateDogFormData, thunkAPI) => {
    try {
      return await dogsService.createOneDog(data);
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
