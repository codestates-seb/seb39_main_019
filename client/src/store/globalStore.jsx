import create from "zustand";
import axios from "axios";

const useStore = create((set) => ({
  isDark: false,
  setIsDark: () => set((state) => ({ isDark: !state.isDark })),
}));

export default useStore;
