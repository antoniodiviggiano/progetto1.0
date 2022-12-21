import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthState } from "src/app/auth/reducers";



export const selectAuthState = 
    createFeatureSelector<AuthState>('auth');

export const datiUtente = createSelector(
    selectAuthState,
    (state) => state.user?.user
);


