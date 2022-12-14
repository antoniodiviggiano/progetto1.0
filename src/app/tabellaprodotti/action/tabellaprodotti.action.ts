import { createAction, props } from "@ngrx/store";
import { IProdottoResp } from "src/app/models/IProdottoResp";

export const visualizza = createAction(
    '[Tabella] visualizza tabella',
    props<{prodotti: IProdottoResp[]}>()
  );