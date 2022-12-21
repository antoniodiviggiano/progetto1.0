
import {
    ActionReducerMap, MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import { IProdottoResp } from '../models/IProdottoResp';


export interface AppState {
}

export const reducers: ActionReducerMap<AppState> = {
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
