import { createDraftSafeSelector } from "@reduxjs/toolkit";

import { TypeRootState } from "@/store/store";

export const authGeneralSelector = (state: TypeRootState) => state.default;
export const authStateSelector = createDraftSafeSelector(
  authGeneralSelector,
  state => state.auth
);
export const authLoadingSelector = createDraftSafeSelector(
  authGeneralSelector,
  state => state.auth.isLoading
);
