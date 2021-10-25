import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {DeviceT} from './factories/device';

interface PayloadActionType {
  data?: DeviceT[] | null;
  error?: any;
  deviceUploaded?: DeviceT | null;
  deviceById?: DeviceT | null;
}

export interface AuthStateReducer extends PayloadActionType {
  loading: boolean;
}

const initState: AuthStateReducer = {
  loading: false,
  error: null,
  data: null,
  deviceUploaded: null,
  deviceById: null,
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
    uploadDeviceSuccess: (state, action: PayloadAction<PayloadActionType>) => ({
      ...state,
      deviceUploaded: action.payload.deviceUploaded,
      loading: false,
      error: null,
    }),
    deviceById: (state, action: PayloadAction<PayloadActionType>) => ({
      ...state,
      deviceById: action.payload.deviceById,
      loading: false,
      error: null,
    }),
    resetDevice: state => ({
      ...state,
      deviceById: null,
      deviceUploaded: null,
      loading: false,
      error: null,
    }),
  },
});

export const {
  start,
  reject,
  resolves,
  uploadDeviceSuccess,
  deviceById,
  resetDevice,
} = devicesSlice.actions;
export default devicesSlice.reducer;
