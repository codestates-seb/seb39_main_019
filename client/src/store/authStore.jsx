import create from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
  persist((set) => ({
    isLogin: false,
    setIsLogin: () => set((state) => ({ isLogin: !state.isLogin })),
  }))
);

export default useAuthStore;
