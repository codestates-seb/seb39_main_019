import create from "zustand";

const useStore = create((set)=>({
  index:0,
  setIndex:((input)=>set({index:input}))
}))

export default useStore