import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AuthUser } from "../types/auth.type";

interface AuthState {
  user: AuthUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

interface AuthUserInfo {
  user: AuthUser;
}

const initialState: AuthState = {
  user: null,
  isLoading: false,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },

    setUser(state, action: PayloadAction<AuthUserInfo>) {
      const { user } = action.payload;
      state.user = user;
      state.isAuthenticated = true;
    },

    setLogout(state) {
      state.user = null;
      state.isLoading = false;
      state.isAuthenticated = false;
    },
  },
});

export const { setLoading, setUser, setLogout } = authSlice.actions;

export default authSlice.reducer;
