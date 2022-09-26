import create from "zustand";

const useStore = create((set)=>({
  title:'',
  body:'',
  location:'',
  personality:'',
  size:'',

  setTitle: (input) =>set(()=>({title:input})),
  setBody: (input) =>set(()=>({body:input})),
  setLo: (input) =>set(()=>({location:input})),
  setPe: (input) =>set(()=>({personality:input})),
  setSi: (input) =>set(()=>({size:input})),
  

}))


export default useStore