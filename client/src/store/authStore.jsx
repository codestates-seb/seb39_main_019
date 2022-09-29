import create from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
  persist((set) => ({
    isLogin: false,
    isPpAuth: false,
    setIsLogin: () => set((state) => ({ isLogin: !state.isLogin })),
    setIsPpAuth: () =>
      set((state) => {
        isPpAuth: !state.isPpAuth;
      }),
  }))
);

export default useAuthStore;
