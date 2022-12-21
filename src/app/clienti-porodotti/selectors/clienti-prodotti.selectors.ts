import { createFeatureSelector, createSelector } from "@ngrx/store";
import {  UsersState } from "../reducers";


export const selectAuthState = 
    createFeatureSelector<UsersState>('users');

export const nomi = createSelector(
    selectAuthState,
    (state) => state!.utenti
);


