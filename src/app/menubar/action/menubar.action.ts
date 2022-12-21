import { createAction, props } from "@ngrx/store";
import { Resp } from "../../models/IResp";


export const checkLogin = createAction(
    '[Menu bar] Check login',
    props<{logged : Resp | undefined}>()
)

