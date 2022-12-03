import axiosInstance from "./axiosInstance";
import { API } from "./constants";

export const startGame = async (gameConfig) => {
  try {
    const res = await axiosInstance.post(API.START_GAME, gameConfig);
    console.log("startGame", res);
    return res;
  } catch (err) {
    console.log("startGame", err);
    return new Promise((_, reject) => reject(err));
  }
};
export const endGame = async (gameConfig, isWin, time) => {
  try {
    gameConfig.result = isWin;
    gameConfig.completedTime = time;
    const res = await axiosInstance.post(API.END_GAME, gameConfig);
    console.log("endGame", res);
    return res;
  } catch (err) {
    console.log("endGame", err);
    return new Promise((_, reject) => reject(err));
  }
};
