import axios from "axios";
import {
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  SET_USER,
} from "./types";

// Register a new user
export const signup = (userData) => async (dispatch) => {
  try {
    dispatch({ type: USER_REGISTER_REQUEST });

    const { data } = await axios.post("/api/users/register", userData); // Updated endpoint

    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload: error.response?.data.message || error.message,
    });
  }
};

// Login user
export const login = (userData) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });

    const { data } = await axios.post("/api/users/login", userData); // Updated endpoint

    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: error.response?.data.message || error.message,
    });
  }
};

// Logout action
export const logoutUser = () => (dispatch) => {
  // Clear user-related data from localStorage (or sessionStorage)
  localStorage.removeItem("userInfo");

  // Dispatch the logout action
  dispatch({
    type: USER_LOGOUT,
  });
};
export const setUser = (userData) => {
  return {
    type: SET_USER,
    payload: userData, // User data passed from the login form
  };
};
