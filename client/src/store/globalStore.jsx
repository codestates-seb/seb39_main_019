import create from "zustand";

const useStore = create((set) => ({



  isLight : true,
  setIsLight : () => set((state)=>({isLight: !state.isLight}))
  
}))


export default useStore

