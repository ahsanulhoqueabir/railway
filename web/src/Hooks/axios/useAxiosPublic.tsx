import { useNavigate } from "react-router";
import axios from "axios";

const axiosPublic = axios.create({
  baseURL: import.meta.env.VITE_APIKEY_Backend_URL,
});

const useAxiosPublic = () => {
  const navigate = useNavigate();

  const handleResponseError = async (error: unknown) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const status = (error as any)?.response?.status;

    if (status === 401 || status === 403 || status === 500) {
      navigate("/error");
    }
    return Promise.reject(error);
  };

  axiosPublic.interceptors.response.use(
    (response) => response,
    handleResponseError
  );

  return axiosPublic;
};

export default useAxiosPublic;
