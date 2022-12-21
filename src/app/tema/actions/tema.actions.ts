import { createAction, props } from "@ngrx/store";

export const tema = createAction(
    '[Footer] Click su cambio tema',
    props<{tema :  string}>()
)