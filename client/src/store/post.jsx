import create from "zustand";

const useStore = create((set)=>({
  title:'',
  body:'',
  location:'',
  personality:'',
  size:'',
  url:'',

  setTitle: (input) =>set(()=>({title:input})),
  setBody: (input) =>set(()=>({body:input})),
  setLo: (input) =>set(()=>({location:input})),
  setPe: (input) =>set(()=>({personality:input})),
  setSi: (input) =>set(()=>({size:input})),
  setUr: (input) =>set(()=>({url:input})),
  

}))


export default useStore