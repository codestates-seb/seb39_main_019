import create from "zustand";
import axios from "axios";
import { devtools } from "zustand/middleware";

const useAuthStore = create(
  devtools((set) => ({
    token: localStorage.getItem("token") ? localStorage.getItem("token") : null,
    // signIn: async (email, password) => {
    //   const res = await axios.post("http://localhost:3001/user", {
    //     email: email,
    //     password: password,
    //   });
    //   set({ token: res.data });
    // },

    // setToken: (value) => set((state) => ({ token: value })),
    // setToken: (input) => set(() => ({ token: input })),
    // setAddTodo: (input) => set((state) => ({ ...state.addTodo, input })),

    ppAuth: "",
    setPpAuth: (input) => set(() => ({ ppAuth: input })),
  }))
);

export default useAuthStore;
