import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Plan = "basic" | "premium" | "premium-plus";

interface UserState {
  uid: string | null;
  email: string | null;
  plan: Plan;
  isLoading: boolean;
}

const initialState: UserState = {
  uid: null,
  email: null,
  plan: "basic",
  isLoading: true,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{ uid: string; email: string | null; plan: Plan }>
    ) => {
      state.uid = action.payload.uid;
      state.email = action.payload.email;
      state.plan = action.payload.plan;
      state.isLoading = false;
    },
    logoutUser: (state) => {
      state.uid = null;
      state.email = null;
      state.plan = "basic";
      state.isLoading = false;
    },
  },
});

export const { setUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
