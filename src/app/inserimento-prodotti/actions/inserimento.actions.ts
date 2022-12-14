import { createAction, props } from "@ngrx/store";
import { IProdottoResp } from "src/app/models/IProdottoResp";
import { IRelazione } from "src/app/models/IRelazione";

export const inserimentoAction = createAction(
    '[Form inserimento nsermiento] aggiunta prodotto',
    props<{prodotti: IProdottoResp[]}>()
  );
export const inserimentoRelazioneAction = createAction(
    '[Inserimento] Creazione relazione',
    props<IRelazione>()
  );