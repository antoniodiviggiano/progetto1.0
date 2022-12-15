import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthState } from "src/app/auth/reducers";
import { AppState } from "src/app/reducers";
import { ProdottiState } from "../reducers";



export const selectProdottiState = 
    createFeatureSelector<ProdottiState>('prodotti');


export const prodottiSelector = createSelector(
    selectProdottiState,
    (state) => state?.prodotti
);
