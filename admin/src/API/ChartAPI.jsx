import axiosClient from "./axiosClient";

const ChartAPI = {
  getWeather: (query) => {
    const url = `/weather/temperature${query}`;
    return axiosClient.get(url);
  },

  getRevenue: (query) => {
    const url = `/revenue${query}`;
    return axiosClient.get(url);
  },

  getBestSeller: (query) => {
    const url = `/bestseller${query}`;
    return axiosClient.get(url);
  },
};

export default ChartAPI;
