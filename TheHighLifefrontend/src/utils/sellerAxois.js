import axois from "axios";

export const API_URL = "http://localhost:8080";
const axoisInstance = axois.create({
  baseURL: API_URL,
});

export const headers = {
  Authorization: `Bearer ${localStorage.getItem("JWTSeller")}`,
};

export default axoisInstance;
