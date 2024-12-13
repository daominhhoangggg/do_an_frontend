import axiosClient from "./axiosClient";

const UserAPI = {
  getAllData: () => {
    const url = "/users";
    return axiosClient.get(url);
  },

  getDetailData: (id) => {
    const url = `/users/${id}`;
    return axiosClient.get(url);
  },

  postSignUp: (data) => {
    const url = `/users/signup`;
    return axiosClient.post(url, data);
  },

  postLogin: (query) => {
    const url = `/users/login/${query}`;
    return axiosClient.post(url);
  },

  putUpdateUser: (data) => {
    const url = `/users/update`;
    return axiosClient.put(url, data);
  },

  deleteUser: (query) => {
    const url = `/users/delete/${query}`;
    return axiosClient.delete(url);
  },
};

export default UserAPI;
