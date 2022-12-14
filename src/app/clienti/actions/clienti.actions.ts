import { createAction, props } from "@ngrx/store";
import { IProdottoResp } from "src/app/models/IProdottoResp";
import { IUserResp } from "src/app/models/IUserResp";

export const clienti = createAction(
    '[Clienti] Caricati clienti',
    props<{users : IUserResp[]}>()
)
export const cliente = createAction(
    '[Clienti] Click su cliente',
    props<IUserResp>()
)
export const prodotti = createAction(
    '[Clienti] Cliente dettaglio',
    props<{idProd : number[]}>()
)
export const lista = createAction(
    '[Clienti] Prodotti ',
    props<{prodotti : IProdottoResp[]}>()
)
