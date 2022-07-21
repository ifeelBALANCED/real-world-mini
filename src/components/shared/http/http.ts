import axios from "axios";
import Cookies from "js-cookie";

import { API_URL } from "@/configs/api.config";

import * as types from "./types";
import { AnyObject } from "./types";

export const instance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(config => {
  const accessToken = Cookies.get("accessToken");
  if (config.headers && accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

const userObj = localStorage.getItem("user");
const user = JSON.parse(String(userObj));

instance.defaults.headers.common.Authorization = user?.token
  ? `Bearer ${user?.token}`
  : "";

export const request = <T = void>(
  options: types.HttpRequestOptions,
  params?: AnyObject
): Promise<T | void> => {
  return instance
    .request({
      url: options.url,
      method: options.method,
      data: options?.data,
      params,
    })
    .then(response => response.data)
    .catch(error => {
      throw error.response?.data;
    });
};

export type HomeParams = Pick<IArticleParams, "offset" | "limit">;

export interface IArticleParams {
  author?: string;
  offset: number;
  limit: number;
  tag?: string;
  favorited?: string;
}
