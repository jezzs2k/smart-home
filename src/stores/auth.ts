import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface PayloadActionType {
  user?: any;
  token?: string | null;
  error?: null;
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
      error: null,
    }),
    reject: (state, action: PayloadAction<PayloadActionType>) => ({
      ...state,
      error: action.payload.error,
      user: null,
      token: null,
    }),
  },
});

export const {start, reject, resolves} = authSlice.actions;
export default authSlice.reducer;
