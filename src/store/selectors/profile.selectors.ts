import { createDraftSafeSelector } from "@reduxjs/toolkit";

import { TypeRootState } from "@/store/store";

export const profileGeneralSelector = (state: TypeRootState) => state.default;
export const profileUserStateSelector = createDraftSafeSelector(
  profileGeneralSelector,
  ({ profile }) => profile.userInfo
);

export const profileStateSelector = createDraftSafeSelector(
  profileGeneralSelector,
  ({ profile }) => profile.profile
);

export const profileLoadingSelector = createDraftSafeSelector(
  profileGeneralSelector,
  ({ profile }) => profile.isLoading
);
