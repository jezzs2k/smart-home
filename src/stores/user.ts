import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "./factories/user";

interface PayloadActionType {
  data?: User | null;
  error?: any;
}

export interface UserStateReducer extends PayloadActionType {
  loading: boolean;
}

const initState: UserStateReducer = {
  loading: false,
  error: null,
  data: null,
};

const userSlice = createSlice({
  name: "users",
  initialState: initState,
  reducers: {
    start: (state) => ({ ...state, loading: true }),
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
    resetDataUser: (state) => ({
      ...state,
      loading: false,
      data: null,
      error: null,
    }),
  },
});

export const { start, reject, resolves, resetDataUser } = userSlice.actions;
export default userSlice.reducer;
