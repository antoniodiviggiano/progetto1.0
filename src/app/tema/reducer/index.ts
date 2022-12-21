
import { createReducer, on } from '@ngrx/store';
import { tema } from '../actions/tema.actions';

export const temaFeatureKey = 'tema';


export interface TemaState {  
  tema : string;
}

export const initialTemaState: TemaState = {
  tema: 'light'
}

export const temaReducer = createReducer(

  initialTemaState,
  on(tema, (state, action) => {
    return {
      ...state,
      tema: action.tema
    }
  }),


);


