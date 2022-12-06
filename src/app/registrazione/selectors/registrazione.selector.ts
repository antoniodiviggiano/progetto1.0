import { createSelector } from "@ngrx/store";

export const registrazione = createSelector(
    (state :any) => state['registrazione'].accessToken,
    (token) => !!token
);