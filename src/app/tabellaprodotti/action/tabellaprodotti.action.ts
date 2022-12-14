import { createAction, props } from "@ngrx/store";
import { IProdottoResp } from "src/app/models/IProdottoResp";


export const visualizza = createAction(
    '[Tabella] visualizza tabella',
    props<{prodotti: IProdottoResp[]}>()
  );

export const elimina = createAction(
  '[Tabella] elimina prodotto',
  props<{id: number}>()
);