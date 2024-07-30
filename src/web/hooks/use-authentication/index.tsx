import { createContext, ReactNode, useContext, useRef } from "react";
import { AuthState, createAuthStore } from "./store";
import { useStore } from "zustand";

type AuthStoreType = ReturnType<typeof createAuthStore>;
const AuthContext = createContext<AuthStoreType | null>(null);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const storeRef = useRef<AuthStoreType>();

  if (!storeRef.current) {
    storeRef.current = createAuthStore();
  }

  return (
    <AuthContext.Provider value={storeRef.current}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuthSelectorStore<T>(selector: (state: AuthState) => T): T {
  const store = useContext(AuthContext);

  if (!store) {
    console.log("Outside AuthContext");
    throw new Error("Missing AuthContext.Provider");
  }

  return useStore(store, selector);
}

export function useAuthStore() {
  const store = useContext(AuthContext);

  if (!store) {
    console.log("Outside AuthContext");
    throw new Error("Missing AuthContext.Provider");
  }

  return store;
}
