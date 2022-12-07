
import { createReducer, on } from '@ngrx/store';
import { Resp } from '../../models/IResp';
import { login } from '../auth.action';
import { logout } from '../auth.action';

export const authFeatureKey = 'auth';


export interface AuthState {
  user: Resp | undefined
}

export const initialAuthState: AuthState = {
  user: undefined
}

export const authReducer = createReducer(

  initialAuthState,
  on(login, (state, action) => {
    return {
      user: action.user
    }
  }),

  on(logout, (state, action) => {
    return {
      user: undefined
    }
  })

);


