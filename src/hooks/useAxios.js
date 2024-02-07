import { useState, useEffect } from "react";
import axios from "axios";
import objectToQueryParams from "../utils";

const BASE_URL = "https://62.3.32.232";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json"
  }
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = await localStorage.getItem("userToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

const useAxios = () => {
  const [response, setResponse] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [controller, setController] = useState();

  const axiosFetch = async (configObj) => {
    const { method, url, requestConfig = {} } = configObj;
    const ctrl = new AbortController();
    let res;
    try {
      setLoading(true);
      setController(ctrl);
      const requestOptions = {
        ...requestConfig,
        signal: ctrl.signal
      };

      const requestUrl =
        method.toLowerCase() === "get"
          ? `${url}?${objectToQueryParams(requestConfig.params)}`
          : url;
      res = await axiosInstance[method.toLowerCase()](
        requestUrl,
        requestOptions
      );

      if (configObj.showDefaultMessage) {
        console.log("Operation successful");
        // Toast.show({
        //   type: "success",
        //   position: "top",
        //   text1: "Operation successful",
        //   visibilityTime: 2000,
        //   autoHide: true,
        //   topOffset: 0
        // });
      }
      setResponse(res.data);
    } catch (err) {
      const errorMessage = err.response?.data?.message || "An error occurred";
      const errorToShow = Array.isArray(errorMessage)
        ? errorMessage[0]
        : errorMessage;

      if (configObj.showDefaultMessage) {
        console.log("err", err, errorToShow);
        // Toast.show({
        //   type: "error",
        //   position: "top",
        //   text1: errorToShow,
        //   visibilityTime: 2000,
        //   autoHide: true,
        //   topOffset: 0
        // });
      }

      console.error("Error occurred:", url, requestConfig.params, err.message);
      setError(err.message);
      throw err.message;
    } finally {
      setLoading(false);
      return res;
    }
  };

  useEffect(() => {
    return () => controller?.abort();
  }, [controller]);

  return [axiosFetch, response, error, loading, setResponse];
};

export default useAxios;
