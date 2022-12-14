import { createAction, props } from "@ngrx/store";
import { IProdotto } from "src/app/models/IProdotto";
import { IProdottoResp } from "src/app/models/IProdottoResp";


export const visualizza = createAction(
    '[Tabella] visualizza tabella',
    props<{prodotti: IProdottoResp[]}>()
  );

export const elimina = createAction(
  '[Tabella] elimina prodotto',
  props<{id: number}>()
);

export const modifica = createAction(
  '[Tabella] modifica prodotto',
  props<{prodotto: IProdottoResp[]}>()
)