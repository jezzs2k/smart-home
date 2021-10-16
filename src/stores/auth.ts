import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {User} from './factories/login';

interface PayloadActionType {
  user?: User | null;
  token?: string | null;
  error?: any;
}

export interface AuthStateReducer extends PayloadActionType {
  loading: boolean;
}

const initState: AuthStateReducer = {
  loading: false,
  user: null,
  token: null,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initState,
  reducers: {
    start: state => ({...state, loading: true}),
    resolves: (state, action: PayloadAction<PayloadActionType>) => ({
      ...state,
      user: action.payload.user,
      token: action.payload.token,
      loading: false,
      error: null,
    }),
    reject: (state, action: PayloadAction<PayloadActionType>) => ({
      ...state,
      error: action.payload.error,
      loading: false,
      user: null,
      token: null,
    }),
  },
});

export const {start, reject, resolves} = authSlice.actions;
export default authSlice.reducer;
