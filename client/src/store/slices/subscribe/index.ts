import { createSlice, PayloadAction, Slice } from "@reduxjs/toolkit";

export interface SubscribeState {
  email: string | null;
}

const initialState: SubscribeState = {
  email: null,
};

export const subscribeSlice: Slice<
  SubscribeState,
  {
    setEmail: (
      state: SubscribeState,
      action: PayloadAction<string | null>
    ) => void;
  }
> = createSlice({
  name: "subscribe",
  initialState,
  reducers: {
    setEmail: (state, action: PayloadAction<string | null>) => {
      state.email = action.payload;
    },
  },
});

export const { setEmail } = subscribeSlice.actions;
export default subscribeSlice.reducer;
