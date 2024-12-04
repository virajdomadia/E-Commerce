import { SET_USER, LOGOUT_USER } from "./types";

export const setUser = (userData) => {
  return {
    type: SET_USER,
    payload: userData,
  };
};

export const logoutUser = () => {
  return {
    type: LOGOUT_USER,
  };
};
