import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {DeviceT} from './factories/device';

interface PayloadActionType {
  data?: DeviceT[] | null;
  error?: any;
}

export interface AuthStateReducer extends PayloadActionType {
  loading: boolean;
}

const initState: AuthStateReducer = {
  loading: false,
  error: null,
  data: null,
};

const devicesSlice = createSlice({
  name: 'devices',
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
  },
});

export const {start, reject, resolves} = devicesSlice.actions;
export default devicesSlice.reducer;
