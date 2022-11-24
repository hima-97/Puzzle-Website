/* eslint-disable no-console */
import axios from "axios";
import qs from "qs";

// Create instance for customizations
const instance = axios.create({
  baseURL: process.env.SERVER_URL,
  paramsSerializer: (params) => {
    return qs.stringify(params, { indices: false });
  },
});

// request header before sending
instance.interceptors.request.use(
  (config) => {
    config.headers = {
      accept: "application/json",
    };
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

function parseError(messages) {
  // error
  if (messages) {
    if (messages instanceof Array) {
      return Promise.reject(new Error("messages error here"));
    }
    return Promise.reject(new Error("messages error here 2"));
  }
  return Promise.reject(new Error("messages error here 3"));
}

// Parse response data
function parseBody(response) {
  if (response.status === 200 || response.status === 201) {
    return response.data;
  }
  return parseError(response.data.messages);
}

// response parse
instance.interceptors.response.use(
  (response) => {
    return parseBody(response);
  },
  async (error) => {
    console.warn("Error status", error.response);
    // return Promise.reject(error)
    if (error.response) {
      if (error.response.status === 401) {
        // logout user?
        console.log("error");
      }
      return error.response.data;
    }
    return Promise.reject(error);
  }
);

export default instance;
