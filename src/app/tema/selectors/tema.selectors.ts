import { createFeatureSelector, createSelector } from "@ngrx/store";
import { TemaState } from "../reducer";



export const selectTemaState = 
    createFeatureSelector<TemaState>('tema');

export const temaselector = createSelector(
    selectTemaState,
    (state) => state.tema
);
