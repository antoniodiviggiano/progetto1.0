
import { createReducer, on } from '@ngrx/store';
import { IProdottoResp } from 'src/app/models/IProdottoResp';
import { IUserResp } from 'src/app/models/IUserResp';
import { clienti, cliente, prodotti, lista } from '../actions/clienti.actions';

export const userFeatureKey = 'clienti';
export const userClickFeatureKey = 'cliente';
export const idProdottiFeatureKey = 'idProdotti';
export const prodottiFeatureKey = 'prodottiCliente';

export interface UsersState {
    users : IUserResp[] | undefined;
}
export interface UserState {
    user : IUserResp | undefined;
}
export interface IdProdottiState {
    idProdotti : number[] | undefined;
}
export interface ProdottiState {
    prodotti : IProdottoResp[] | undefined;
}


export const initialiUsersState: UsersState = {
    users : undefined,
}
export const initialiUserClickState: UserState = {
    user : undefined,
}
export const initialiIdProdottiState: IdProdottiState = {
    idProdotti : undefined,
}
export const initialProdottiState: ProdottiState = {
    prodotti : [],
}

export const userReducer = createReducer(
    initialiUsersState,

    on(clienti, (state, action) => {
        return {
            users : action.users
        }
    })
); 
export const userIdProdottiReducer = createReducer(
    initialiUserClickState,

    on(cliente, (state, action) => {
        return {
            user : action
        }
    })
); 
export const prodottiIdReducer = createReducer(
    initialiIdProdottiState,

    on(prodotti, (state, action) => {
        return {
            idProdotti : action.idProd
        }
    })
); 
export const prodottiReducer = createReducer(
    initialProdottiState,

    on(lista, (state, action) => {
        return {
            prodotti : action.prodotti
        }
    })
); 

