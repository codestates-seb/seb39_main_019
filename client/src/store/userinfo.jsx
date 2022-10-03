import create from "zustand";
import { persist } from "zustand/middleware";

const useUserInfo = create(
  persist((set) => ({
    userInfo: "",
    userId: "",
    userNickName: "",
    userEmail: "",
    setUserInfo: (input) => set(() => ({ userInfo: input })),
    setUserId: (input) => set(() => ({ userId: input })),
    setUserNickName: (input) => set(() => ({ userNickName: input })),
    setUserEmail: (input) => set(() => ({ userEmail: input })),
  }))
);

export default useUserInfo;
