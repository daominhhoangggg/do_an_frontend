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

  getMonthlyRevenue: (query) => {
    const url = `/products/revenue${query}`;
    return axiosClient.get(url);
  },

  getProductSales: (query) => {
    const url = `/products/sales${query}`;
    return axiosClient.get(url);
  },
};

export default ChartAPI;
