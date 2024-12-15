import axiosClient from "./axiosClient";

const ChartAPI = {
  getTemperature: (query) => {
    const url = `/weather/temperature${query}`;
    return axiosClient.get(url);
  },

  getHumidity: (query) => {
    const url = `/weather/humidity${query}`;
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
