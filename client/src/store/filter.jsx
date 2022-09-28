import create from "zustand";
import axios from "axios";

const useStore = create((set)=>({
  data:[],
  index:0,
  filter:'',
  setFilter:(input) =>set(()=>({filter:input})),
  setData: async()=>{
    const response = await axios.get(`http://localhost:3001/content`)
    set({data: response.data})
  },
  setIndex:((input)=>set({index:input}))
}))

  

export default useStore