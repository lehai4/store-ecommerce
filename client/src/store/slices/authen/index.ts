import { createSlice, Slice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { User } from "@/types/admin";
// Define a type for the slice state
export interface AuthenState {
  statusLogin: boolean;
  statusLogout: boolean;
  user: User | null;
}

// Define the initial state using that type
const initialState: AuthenState = {
  statusLogin: false,
  statusLogout: false,
  user: null,
};

export const authenSlice = createSlice({
  name: "authen",
  initialState,
  reducers: {
    setStatusLogin: (state, action: PayloadAction<boolean>) => {
      state.statusLogin = action.payload;
    },
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
    setStatusLogout: (state, action: PayloadAction<boolean>) => {
      state.statusLogout = action.payload;
    },
  },
}) as Slice<
  AuthenState,
  {
    setStatusLogin: (
      state: AuthenState,
      action: PayloadAction<boolean>
    ) => void;
    setUser: (state: AuthenState, action: PayloadAction<User | null>) => void;
    setStatusLogout: (
      state: AuthenState,
      action: PayloadAction<boolean>
    ) => void;
  },
  "authen"
>;

export const { setStatusLogin, setUser, setStatusLogout } = authenSlice.actions;

export default authenSlice.reducer;
