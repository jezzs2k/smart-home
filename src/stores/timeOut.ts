import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface PayloadActionType {
  data?: {success: Boolean} | null;
  error?: any;
}

export interface TimeOutStateReducer extends PayloadActionType {
  loading: boolean;
}

const initState: TimeOutStateReducer = {
  loading: false,
  error: null,
  data: null,
};

const timeOutSlice = createSlice({
  name: 'users',
  initialState: initState,
  reducers: {
    start: state => ({...state, loading: true}),
    resolves: (state, action: PayloadAction<PayloadActionType>) => ({
      ...state,
      data: action.payload.data,
      loading: false,
      error: null,
    }),
    reject: (state, action: PayloadAction<PayloadActionType>) => ({
      ...state,
      error: action.payload.error,
      loading: false,
      data: null,
    }),
    resetDataUser: state => ({
      ...state,
      loading: false,
      data: null,
      error: null,
    }),
  },
});

export const {start, reject, resolves, resetDataUser} = timeOutSlice.actions;
export default timeOutSlice.reducer;
