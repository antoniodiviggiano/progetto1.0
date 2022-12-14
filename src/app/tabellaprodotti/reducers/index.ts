import { createReducer, on } from "@ngrx/store";
import { login } from "src/app/auth/action/auth.action";
import { inserimentoAction } from "src/app/inserimento-prodotti/actions/inserimento.actions";
import { visualizza } from "src/app/tabellaprodotti/action/tabellaprodotti.action";
import { IProdottoResp } from '../../models/IProdottoResp';


export const visualizzaFeatureKey = 'prodotti';


export interface ProdottiState {
  prodotti: IProdottoResp[] | undefined
}

export const initialProdottiState: ProdottiState = {
  prodotti: undefined
}

export const prodottiReducer = createReducer(

  initialProdottiState,
  on(visualizza, (state, action) => {
    
    return {
      prodotti: action.prodotti
    }
  }),
  on(inserimentoAction, (state, action) => {
    
    return {
      prodotti: action.prodotti
    }
  }),

);


