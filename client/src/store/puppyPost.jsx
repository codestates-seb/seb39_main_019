import create from "zustand";

const usePuppyPost = create((set) => ({
  dogNm: "",
  breed: "",
  age: "",
  sexNm: "",

  setDogNm: (input) => set(() => ({ dogNm: input })),
  setBreed: (input) => set(() => ({ breed: input })),
  setAge: (input) => set(() => ({ age: input })),
  setSexNm: (input) => set(() => ({ sexNm: input })),
}));

export default usePuppyPost;
