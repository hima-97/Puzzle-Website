import axiosInstance from "./axiosInstance";
import { API } from "./constants";

export const search = async (dateFrom, dateTo) => {
  try {
    const res = await axiosInstance.post(API.SEARCH_PUZZLE, {
      dateFrom,
      dateTo,
    });
    console.log("search", res);
    return res;
  } catch (err) {
    console.log("search", err);
    return new Promise((_, reject) => reject(err));
  }
};
