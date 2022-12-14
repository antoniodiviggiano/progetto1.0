import { createReducer, on } from "@ngrx/store";
import { login } from "src/app/auth/action/auth.action";
import { elimina, visualizza } from "src/app/tabellaprodotti/action/tabellaprodotti.action";
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
    console.log(action.prodotti);
    
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
  })


);


/* export const inserisciReducer = createReducer(
  initialProdottiState,
  on(inserisci, (state, action) => {


    console.log(state.prodotti)
    return {
       
       prodotti: [...action.prodotti],
       
       
    }
  }),
); */