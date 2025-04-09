// api/axiosClient.js
import axios from "axios";
import queryString from "query-string";
import { jwtDecode } from "jwt-decode";
import alertify from "alertifyjs";
// Set up default config for http requests here
// Please have a look at here `https://github.com/axios/axios#requestconfig` for the full list of configs
const axiosClient = axios.create({
  baseURL: "https://njs301x-asm-3-back-end.onrender.com",
  // baseURL: "http://localhost:5000",
  headers: {
    "content-type": "application/json",
  },
  paramsSerializer: (params) => queryString.stringify(params),
});

const isTokenExpired = (token) => {
  if (!token) return true;
  try {
    const decoded = jwtDecode(token);
    return decoded.exp * 1000 < Date.now();
  } catch (error) {
    return true; // Không decode được => hết hạn
  }
};

axiosClient.interceptors.request.use(async (config) => {
  // Handle token here ...
  const token = localStorage.getItem("token");

  if (isTokenExpired(token)) {
    if (token) {
      alertify.set("notifier", "position", "bottom-left");
      alertify.error("Vui lòng đăng nhập lại.");
    }
    localStorage.removeItem("token");
  }

  config.headers["Authorization"] = "Bearer " + token;

  if (config.data instanceof FormData) {
    delete config.headers["Content-Type"];
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
    // Handle errors when response
    alertify.set("notifier", "position", "bottom-left");
    alertify.error(error.response.data.message);
    throw error;
  }
);

export default axiosClient;
