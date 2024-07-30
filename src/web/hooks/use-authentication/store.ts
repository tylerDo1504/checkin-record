import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export interface AuthState {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
  resetStore: () => void;
}

const initialState = {
  isAuthenticated: false,
};

export const createAuthStore = () => {
  return create<AuthState>()(
    immer((set) => ({
      ...initialState,
      login: () => set({ isAuthenticated: true }),
      logout: () => set({ isAuthenticated: false }),
      resetStore: () => set(initialState, true),
    }))
  );
};
