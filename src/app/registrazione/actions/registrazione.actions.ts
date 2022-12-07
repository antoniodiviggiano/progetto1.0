import { createAction, props } from "@ngrx/store";
import { Resp } from "src/app/models/IResp";

export const registazione = createAction(
    '[Pagina registrazione] Click su registrazione',
    props<Resp>()
)



