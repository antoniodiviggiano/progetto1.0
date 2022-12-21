import { createReducer, on } from "@ngrx/store";
import { IUserResp } from "src/app/models/IUserResp";
import { utenti } from "../actions/clientiProdotti-actions";

export const usersFeatureKey = 'users';


export interface UsersState {
  utenti : IUserResp[] | undefined
}

export const initialUsersState: UsersState = {
  utenti: undefined
}

export const usersReducer = createReducer(

  initialUsersState,
  on(utenti, (state, action) => {
    return {
      ...state,
      utenti: action!.users
    }
  }),

);


