import { createDraftSafeSelector } from "@reduxjs/toolkit";

import { TypeRootState } from "@/store/store";

export const homeGeneralSelector = (state: TypeRootState) => state.default;

export const homeStateSelector = createDraftSafeSelector(
  homeGeneralSelector,
  ({ home }) => home.feed
);

export const homeLoadingSelector = createDraftSafeSelector(
  homeGeneralSelector,
  ({ home }) => home.isLoading
);

export const tagsStateSelector = createDraftSafeSelector(
  homeGeneralSelector,
  ({ home }) => home.tags
);
