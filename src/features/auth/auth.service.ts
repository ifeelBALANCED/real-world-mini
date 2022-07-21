import axios from "axios";
import Cookies from "js-cookie";

import { API_URL } from "@/configs/api.config";
import { UserLoginData, UserRegisterData } from "@/types/types";

const register = async (userData: UserRegisterData) => {
  const response = await axios.post(`${API_URL}/users/register`, userData);

  if (response) {
    Cookies.set("accessToken", response.data.token, { expires: 356 });
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response;
};

const login = async (userData: UserLoginData) => {
  const response = await axios.post(`${API_URL}/users/login`, userData);

  if (response) {
    Cookies.set("accessToken", response.data.token);
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response;
};

const logout = () => {
  Cookies.remove("accessToken");
  localStorage.removeItem("user");
};

const authService = {
  register,
  logout,
  login,
};

export default authService;
