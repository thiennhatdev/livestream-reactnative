import axios from "axios"; 
import { HOST } from "@env";

const request = axios.create({
  baseURL : `${HOST}api/`,
  headers: {
    // Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
    timeout : 30 * 1000,
  }, 
  // .. other options
});

request.interceptors.request.use((axiosConfig) => {
    axiosConfig.headers = {
      ...axiosConfig.headers,
      // Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjg5MTI2MDkwLCJleHAiOjE2OTE3MTgwOTB9.AqVXkxAU9w2M3uFMg04VSnoiLes_CKa5y6dXc5EQvYc`,
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