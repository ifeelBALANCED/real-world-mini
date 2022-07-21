import { CreateDogFormData } from "@/components/screens/create-dog/components/create-dog-form";
import { UpdateDogFormData } from "@/components/screens/dog/components/edit-dog-form";
import { request } from "@/components/shared/http";
import { Dog } from "@/types/types";

export const getDogsList = async () => {
  return await request<Dog[]>({
    url: "/dogs/list",
    method: "get",
  });
};

export const getDogById = async (id: string) => {
  return await request<Dog>({
    url: `/dogs/dog/${id}`,
    method: "get",
  });
};

export const createOneDog = async (data: CreateDogFormData) => {
  return await request<Dog>({
    url: `/dogs/dog/create`,
    method: "post",
    data,
  });
};

export const updateOneDog = async (data: UpdateDogFormData, id: string) => {
  return await request<Dog>({
    url: `/dogs/dog/${id}/update`,
    method: "put",
    data,
  });
};

export const deleteOneDog = async (id: string) => {
  return await request({
    url: `/dogs/dog/${id}/delete`,
    method: "delete",
  });
};

const dogsService = {
  updateOneDog,
  createOneDog,
  deleteOneDog,
  getDogsList,
  getDogById,
};

export default dogsService;
