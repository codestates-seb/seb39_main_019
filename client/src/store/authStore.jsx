import create from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
  persist((set) => ({
    isLogin: false,
    isPpAuth: false,
    setIsLogin: () => set((state) => ({ isLogin: !state.isLogin })),
    setIsPpAuth: () => set((state) => ({ isPpAuth: !state.isPpAuth })),
  }))
);

export default useAuthStore;

// 파일 이름을 userInfo 로 하면되지않을까 합니다. const useUserInfo