import axios from "axios"; 
import { HOST } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";

const request = axios.create({
  baseURL : `${HOST}api/`,
  headers: {
    "Content-Type": "application/json",
    timeout : 30 * 1000,
  }, 
  // .. other options
});

request.interceptors.request.use(async (axiosConfig) => {
    const token = await AsyncStorage.getItem('token');
    axiosConfig.headers = {
      ...axiosConfig.headers,
      Authorization: `Bearer ${token}`,
    };
  
    return axiosConfig;
});
  
request.interceptors.response.use(
    (response) => response.data,
    (error) => {
      const { status } = error.response;
  
      if (status === 400) {
        const {
          data: { message },
        } = error.response;
      }
  
      return Promise.reject(error);
    }
  );
  

export default request;