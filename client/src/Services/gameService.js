import axiosInstance from "./axiosInstance";
import { API } from "constants";

export const startGame = () => {
  axiosInstance.post(API.startGame, {}).then().catch();
};
export const updateGameResult = () => {};
