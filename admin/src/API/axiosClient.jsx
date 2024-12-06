// api/axiosClient.js
import axios from "axios";
import queryString from "query-string";
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
  if (!token) return true;
  try {
    const decoded = jwtDecode(token);
    return decoded.exp * 1000 < Date.now();
  } catch (error) {
    return true; // Không decode được => hết hạn
  }
};

// const refreshAccessToken = async () => {
//   try {
//     const refreshToken = localStorage.getItem("refreshToken");
//     if (!refreshToken) throw new Error("NO refresh token available");

//     const response = await axios.post("http://localhost:5000/auth/refresh", {
//       token: refreshToken,
//     });

//     const { accessToken, refreshToken: newRefreshToken } = response.data;
//     localStorage.setItem("token", accessToken);
//     localStorage.setItem("refreshToken", newRefreshToken);

//     return accessToken;
//   } catch (error) {
//     console.error("Failed to refresh token", error);
//     throw error;
//   }
// };

axiosClient.interceptors.request.use(async (config) => {
  // Handle token here ...
  let token = localStorage.getItem("token");

  if (isTokenExpired(token)) {
    localStorage.removeItem("token");
    // try {
    //   token = await refreshAccessToken();
    // } catch (error) {
    //   console.error("Token refresh failed. Logging out...");
    //   localStorage.removeItem("token");
    //   localStorage.removeItem("refreshToken");
    //   throw error;
    // }
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
      return response.data;
    }
    return response;
  },
  (error) => {
    // Handle errors
    throw error;
  }
);
export default axiosClient;
