import axios from "axios";

const Axios = axios.create({
  baseURL: import.meta.env.VITE_APIKEY_Backend_URL,
});
const useAxios = () => {
  Axios.interceptors.response.use((res) => res);
  return Axios;
};

export default useAxios;
