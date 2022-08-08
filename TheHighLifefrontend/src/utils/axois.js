import axois from "axios";

export const API_URL = "http://localhost:8080";
const axoisInstance = axois.create({
  baseURL: API_URL,
});

// Set the AUTH token for any request
// axoisInstance.interceptors.request.use(function (config) {
//   const token = JSON.parse(localStorage.getItem("JWT"));
//   config.headers.Authorization = token ? `Bearer ${token}` : "";
//   return config;
// });

export const headers = {
  Authorization: `Bearer ${localStorage.getItem("JWTUSER")}`,
};

export default axoisInstance;
