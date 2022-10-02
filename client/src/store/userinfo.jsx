import create from "zustand";
import { persist } from "zustand/middleware";

const useUserInfo = create(
  persist((set) => ({
    userInfo: "",
    userId: "",
    setUserInfo: (input) => set(() => ({ userInfo: input })),
    setUserId: (input) => set(() => ({ userId: input })),
  }))
);

export default useUserInfo;
