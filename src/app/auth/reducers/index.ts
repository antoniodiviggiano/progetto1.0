
import { createReducer, on } from '@ngrx/store';
import { logout } from 'src/app/actions/app.actions';
import { Resp } from '../../models/IResp';
import { login } from '../action/auth.action';

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
      ...state,
      user: action.user
    }
  }),

  on(logout, (state, action) => {
    return {
      ...state,
      user: undefined
    }
  })

);


