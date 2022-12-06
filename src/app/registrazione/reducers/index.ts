
import { createReducer, on } from '@ngrx/store';
import { IUser } from 'src/app/models/IUser';
import { registazione } from '../actions/registrazione.actions';

export const authFeatureKey = 'registrazione';

export interface RegState {
    accessToken: string | undefined,
    user : IUser | undefined
}

export const initialiRegState: RegState = {
    accessToken: undefined,
    user : undefined
}

export const registrazioneReducer = createReducer(
    initialiRegState,

    on(registazione, (state, action) => {
        return {
            accessToken: action.accessToken,
            user : action.user,
        }
    })
); 
