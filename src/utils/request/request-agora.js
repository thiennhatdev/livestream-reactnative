import axios from "axios"; 
import { HOST, AGORA_CUSTOMER_ID, AGORA_SECRET_ID } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Buffer } from "buffer";

const request = axios.create({
  baseURL : `https://api.agora.io/dev/v1/`,
  headers: {
    "Content-Type": "application/json",
    timeout : 30 * 1000,
  }, 
  // .. other options
});

request.interceptors.request.use(async (axiosConfig) => {
    // const token = await AsyncStorage.getItem('token');
    const plainCredential = AGORA_CUSTOMER_ID + ":" + AGORA_SECRET_ID;
// Encode with base64
    encodedCredential = Buffer.from(plainCredential).toString('base64')
    authorizationField = "Basic " + encodedCredential

    axiosConfig.headers = {
      ...axiosConfig.headers,
      Authorization: `${authorizationField}`,
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

