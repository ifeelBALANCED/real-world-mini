import { createDraftSafeSelector } from "@reduxjs/toolkit";

import { TypeRootState } from "@/store/store";

export const dogsGeneralSelector = (state: TypeRootState) => state.default;
export const dogsStateSelector = createDraftSafeSelector(
  dogsGeneralSelector,
  ({ dogs }) => dogs.dogs
);

export const dogsLoadingSelector = createDraftSafeSelector(
  dogsGeneralSelector,
  ({ dogs }) => dogs.isLoading
);
