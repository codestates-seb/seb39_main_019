import create from "zustand";
import axios from "axios";

const useStore = create((set) => ({



  isLight : true,
  setIsLight : () => set((state)=>({isLight: !state.isLight}))
  
}))


export default useStore

