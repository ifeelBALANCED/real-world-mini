import { createDraftSafeSelector } from "@reduxjs/toolkit";

import { TypeRootState } from "@/store/store";

export const dogGeneralSelector = (state: TypeRootState) => state.default;
export const dogStateSelector = createDraftSafeSelector(
  dogGeneralSelector,
  ({ dog }) => dog
);

export const dogLoadingSelector = createDraftSafeSelector(
  dogGeneralSelector,
  ({ dog }) => dog.isLoading
);
