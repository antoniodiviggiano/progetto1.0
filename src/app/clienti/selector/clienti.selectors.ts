import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IdProdottiState, ProdottiState, UsersState, UserState } from "../reducer";


export const selectClientiState = createFeatureSelector<UsersState>('clienti');
export const selectClienteState = createFeatureSelector<UserState>('cliente');
export const selectIdProdottiState = createFeatureSelector<IdProdottiState>('idProdotti');
export const selectProdottiState = createFeatureSelector<ProdottiState>('prodottiCliente');

export const users = createSelector(
    selectClientiState,
    clienti => clienti.users
);
export const user = createSelector(
    selectClienteState,
    clienti => clienti.user
);
export const prodottiSel = createSelector(
    selectIdProdottiState,
    prodotti => prodotti.idProdotti
);
export const prodottiDef = createSelector(
    selectProdottiState,
    prodotti => prodotti.prodotti
);