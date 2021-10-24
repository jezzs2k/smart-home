import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {User} from './factories/login';

interface PayloadActionType {
  user?: User | null;
  token?: string | null;
  error?: any;
  data?: User | null;
}

export interface AuthStateReducer extends PayloadActionType {
  loading: boolean;
  userRegister?: User | null;
}

const initState: AuthStateReducer = {
  loading: false,
  user: null,
  token: null,
  error: null,
  userRegister: null,
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
    register: (state, action: PayloadAction<PayloadActionType>) => ({
      ...state,
      userRegister: action.payload.data,
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
    resetAuth: state => ({
      ...state,
      error: null,
      loading: false,
      user: null,
      token: null,
      data: null,
      userRegister: null,
    }),
  },
});

export const {start, reject, resolves, register, resetAuth} = authSlice.actions;
export default authSlice.reducer;
