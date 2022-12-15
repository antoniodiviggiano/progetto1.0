import { createAction, props } from "@ngrx/store";
import { Resp } from "../../models/IResp";


export const login = createAction(
  '[Login Page] User Login',
  props<{user: Resp}>()
);

export const logout = createAction(
    '[Logout] Logout'
)
