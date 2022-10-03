import create from "zustand";

const useUserInfo = create(
  ((set) => ({
  userInfo: '',
  setUserInfo: (input) => set(() => ({ userInfo: input })),
 }))
)

export default useUserInfo;
