/* eslint-disable no-console */
import axios from "axios";
import { API } from "./constants";
// import qs from "qs";

// Create instance for customizations
const instance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
  headers: {
    Authorization: localStorage.getItem("token"),
    Accept: "application/json",
  },
});

// Check authenticated on
instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if (error.response.status === 401 && error.config.url !== API.CHECK_AUTH) {
      localStorage.setItem("token", null);
      alert("You need to login to process further!");
    }
    return Promise.reject(error);
  }
);

export default instance;
