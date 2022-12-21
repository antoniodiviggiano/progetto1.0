import { createAction, props } from "@ngrx/store";
import { IUserResp } from "src/app/models/IUserResp";

export const utenti = createAction(
    '[Inserimento] Caricati utenti',
    props<{users : IUserResp[]}>()
  );