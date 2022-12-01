import axiosInstance from "./axiosInstance";
import { API } from "./constants";

export const startGame = () => {
  axiosInstance.post(API.START_GAME, {}).then().catch();
};
export const updateGameResult = () => {};
