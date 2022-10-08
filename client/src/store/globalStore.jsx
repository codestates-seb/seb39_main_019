import create from "zustand";

const useGlobal = create((set) => ({


  isLight : true,
  setIsLight : () => set((state)=>({isLight: !state.isLight}))
  
}))


export default useGlobal

