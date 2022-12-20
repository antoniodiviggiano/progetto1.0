import { createAction, props } from "@ngrx/store";
import { IProdottoResp } from "src/app/models/IProdottoResp";
import { IRelazione } from "src/app/models/IRelazione";
import { IUserResp } from "src/app/models/IUserResp";

export const inserimentoAction = createAction(
    '[Form inserimento nsermiento] aggiunta prodotto',
    props<{prodotti: IProdottoResp[]}>()
  );
export const inserimentoRelazioneAction = createAction(
    '[Inserimento] Creazione relazione',
    props<IRelazione>()
  );