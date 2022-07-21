import { HomeParams, request } from "@/components/shared/http";
import { Article, IFeed } from "@/types/types";

export const getUserFeed = async (params: HomeParams) => {
  return await request<{ articles: Article[]; articlesCount: number }>(
    {
      url: "/articles/feed",
      method: "get",
    },
    params
  );
};

export const getHomeTags = async () => {
  return await request<string[]>({
    url: "/tags",
    method: "get",
  });
};

const homeService = {
  getUserFeed,
  getHomeTags,
};

export default homeService;
