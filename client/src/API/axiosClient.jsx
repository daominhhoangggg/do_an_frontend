// api/axiosClient.js
import axios from "axios";
import queryString from "query-string";
import alertify from "alertifyjs";
import { jwtDecode } from "jwt-decode";
// Set up default config for http requests here
// Please have a look at here `https://github.com/axios/axios#requestconfig` for the full list of configs
const axiosClient = axios.create({
  // baseURL: "https://njs301x-asm-3-back-end.onrender.com",
  baseURL: "http://localhost:5000",
  headers: {
    "content-type": "application/json",
  },
  paramsSerializer: (params) => queryString.stringify(params),
});

const isTokenExpired = (token) => {
  try {
    const decoded = jwtDecode(token);
    return decoded.exp * 1000 < Date.now();
  } catch (error) {
    return true; // Không decode được => hết hạn
  }
};

//Config request
axiosClient.interceptors.request.use(async (config) => {
  // Handle token here ...
  const token = localStorage.getItem("token");

  if (token && isTokenExpired(token)) {
    localStorage.removeItem("token");
    alertify.set("notifier", "position", "bottom-left");
    alertify.success("Phiên đăng nhập đã hết hạn.");
  }

  if (token) {
    config.headers["Authorization"] = "Bearer " + token;
  }

  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      if (response.data.message) {
        alertify.set("notifier", "position", "bottom-left");
        alertify.success(response.data.message);
      }
      return response.data;
    }
    return response;
  },
  (error) => {
    // Handle errors
    alertify.set("notifier", "position", "bottom-left");
    alertify.error(error.response.data.message);
    throw error;
  }
);
export default axiosClient;
