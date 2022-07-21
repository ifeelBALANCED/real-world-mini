import { createDraftSafeSelector } from "@reduxjs/toolkit";

import { TypeRootState } from "@/store/store";

export const articleGeneralSelector = (state: TypeRootState) => state.default;

export const articleStateSelector = createDraftSafeSelector(
  articleGeneralSelector,
  ({ articles }) => articles.articles.articles
);
export const singleArticleStateSelector = createDraftSafeSelector(
  articleGeneralSelector,
  ({ articles }) => articles.singleArticle
);

export const articleLoadingSelector = createDraftSafeSelector(
  articleGeneralSelector,
  ({ articles }) => articles.isLoading
);
