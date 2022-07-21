import { CreateCommentFormData } from "@/components/screens/article/components/create-comment/create-comment";
import { EditArticleFormData } from "@/components/screens/edit-article/components/edit-article-form";
import { EditorFormData } from "@/components/screens/editor/components/editor-form";
import { IArticleParams, request } from "@/components/shared/http";
import { Article } from "@/types/types";

export const createArticle = async (data: EditorFormData) => {
  return await request<{ article: Article }>({
    url: "/articles",
    method: "post",
    data: { article: { ...data, tagList: data.tagList.split(" ") } },
  });
};

export const updateArticle = async (
  data: EditArticleFormData,
  slug: string
) => {
  return await request<{ article: Article }>({
    url: `/articles/${slug}`,
    method: "put",
    data: { article: { ...data, tagList: data.tagList.split(" ") } },
  });
};

export const createComment = async (
  data: CreateCommentFormData,
  slug: string
) => {
  return await request<{ article: Article }>({
    url: `/articles/${slug}/comments`,
    method: "post",
    data: { comment: data },
  });
};

export const deleteComment = async (id: number, slug: string) => {
  return await request({
    url: `/articles/${slug}/comments/${id}`,
    method: "delete",
  });
};

export const deleteArticle = async (slug: string) => {
  return await request({
    url: `/articles/${slug}`,
    method: "delete",
  });
};

export const getArticle = async (slug: string) => {
  return await request<{ article: Article }>({
    url: `/articles/${slug}`,
    method: "get",
  });
};

export const favoriteArticle = async (slug: string) => {
  return await request<{ article: Article }>({
    url: `/articles/${slug}/favorite`,
    method: "post",
  });
};

export const unfavoriteArticle = async (slug: string) => {
  return await request<{ article: Article }>({
    url: `/articles/${slug}/favorite`,
    method: "delete",
  });
};

export const getAllArticle = async (params: IArticleParams) => {
  return await request<{ articles: Article[] }>(
    {
      url: `/articles`,
      method: "get",
    },
    params
  );
};

const articleService = {
  createArticle,
  createComment,
  updateArticle,
  deleteComment,
  deleteArticle,
  getArticle,
  getAllArticle,
  favoriteArticle,
  unfavoriteArticle,
};

export default articleService;
