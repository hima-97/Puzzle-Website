/* eslint-disable no-console */
import axios from "axios";
// import qs from "qs";

// Create instance for customizations
const instance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
  headers: {
    Authorization: localStorage.getItem("token"),
    Accept: "application/json",
  },
});

export default instance;
