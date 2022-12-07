import { createAction, props } from "@ngrx/store";

export const login = createAction(
    '[Menu bar] Click su accedi',
)
export const registrazione = createAction(
    '[Menu bar] Click su registrazione',
)
export const clienti = createAction(
    '[Menu bar] Click su clienti',
)
export const dashboard = createAction(
    '[Menu bar] Click su dashboard',
)
export const logout = createAction(
    '[Menu bar] Click su logout',
)
export const it = createAction(
    '[Select traduzione] Click su IT',
    props<{lang :String}>()
)
export const gb = createAction(
    '[Select traduzione] Click su GB',
    props<{lang :String}>()
)
export const es = createAction(
    '[Select traduzione] Click su ES',
    props<{lang :String}>()
)