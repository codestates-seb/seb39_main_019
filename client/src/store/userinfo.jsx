import create from "zustand";
import { persist } from "zustand/middleware";

const useUserInfo = create(
  persist((set) => ({
    userInfo: "",
    setUserInfo: (input) => set(() => ({ userInfo: input })),
  }))
);

export default useUserInfo;
