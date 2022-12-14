import { createAction, props } from "@ngrx/store";
import { IProdottoResp } from "src/app/models/IProdottoResp";

export const inserimentoAction = createAction(
    '[Form inserimento nsermiento] aggiunta prodotto',
    props<{prodotti: IProdottoResp[]}>()
  );