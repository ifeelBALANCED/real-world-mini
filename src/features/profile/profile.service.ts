import { request } from "@/components/shared/http";

export const getSettings = async () => {
  return await request({
    url: "/users/get-current",
    method: "get",
  });
};

export const getUserProfileByUsername = async (username: string) => {
  return await request({
    url: `/profiles/${username}`,
    method: "get",
  });
};

export const followUserProfile = async (username: string) => {
  return await request({
    url: `/profiles/${username}/follow`,
    method: "post",
  });
};

export const unfollowUserProfile = async (username: string) => {
  return await request({
    url: `/profiles/${username}/follow`,
    method: "delete",
  });
};

const userService = {
  getSettings,
  getUserProfileByUsername,
  followUserProfile,
  unfollowUserProfile,
};

export default userService;
