import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_DB_HOST
});
instance.defaults.timeout = 5000;

instance.interceptors.response.use(
  response => {
    const res = response.data
    return res
  },
  error => {
    console.log(error)
  } 
)

export default instance


