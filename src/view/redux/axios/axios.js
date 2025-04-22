// import axios from "axios";

// const API = axios.create({
//   baseURL: process.env.REACT_APP_BASE_URL, 
//   headers: {
//     "Content-Type": "application/json",
//   },
// });


// API.interceptors.request.use((config) => {
//   const token = localStorage.getItem("authToken");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// export default API;

import axios from "axios";
const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});
// :white_tick: Automatically attach token to every request
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
// Existing response interceptor
instance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);
export default instance;









