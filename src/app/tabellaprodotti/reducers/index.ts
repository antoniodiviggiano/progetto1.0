import { createReducer, on } from "@ngrx/store";
import { inserimentoAction } from "src/app/inserimento-prodotti/actions/inserimento.actions";
import { elimina, modifica, visualizza } from "src/app/tabellaprodotti/action/tabellaprodotti.action";
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

  on(elimina, (state, {id}) => {
    const aggiornaTabella = state.prodotti?.filter(el => {
      return el.id !== id;
    })
    
    return {
      ...state, 
      prodotti: aggiornaTabella,
    }
  }),

  on(modifica, (state, action) => {
    return {
     prodotti: action.prodotto
    }
  })


);


