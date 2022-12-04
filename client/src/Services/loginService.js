import axiosInstance from "./axiosInstance";
import { API } from "./constants";

export const login = async (data) => {
  try {
    const res = await axiosInstance.post(API.LOGIN, {
      email: data.email,
      password: data.password,
    });
    console.log(res);
    return res;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const checkAuth = async () => {
  try {
    const res = await axiosInstance.post(API.CHECK_AUTH);
    return res.status === 200;
  } catch (err) {
    return false;
  }
};

export const register = async (data) => {
  try {
    const res = await axiosInstance.post(API.REGISTER, {
      email: data.email,
      password: data.password,
      repassword: data.repassword,
      firstName: data.firstName,
      lastName: data.lastName,
    });
    console.log(res);
    return res;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const logout = async () => {
  try {
    const res = await axiosInstance.post(API.LOGOUT);
    console.log(res);
    return res;
  } catch (err) {
    console.log(err);
    return err;
  }
};
