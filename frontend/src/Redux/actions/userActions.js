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

    // Save the token to localStorage
    localStorage.setItem("authToken", data.token); // Store token for future requests
    localStorage.setItem("userInfo", JSON.stringify(data.user)); // Save user info as well if needed

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
  localStorage.removeItem("authToken"); // Remove the token as well

  // Dispatch the logout action
  dispatch({
    type: USER_LOGOUT,
  });

  // Optional: Clear the Axios default authorization header after logout
  delete axios.defaults.headers["Authorization"];
};

export const setUser = (userData) => {
  return {
    type: SET_USER,
    payload: userData, // User data passed from the login form
  };
};

export const autoLogin = () => (dispatch) => {
  const userInfo = localStorage.getItem("userInfo");
  const authToken = localStorage.getItem("authToken");

  if (userInfo && authToken) {
    // User info and token exist, proceed with auto-login
    dispatch({
      type: SET_USER,
      payload: JSON.parse(userInfo), // Set user data
    });

    // Set the authorization header for API requests
    axios.defaults.headers["Authorization"] = `Bearer ${authToken}`;
  }
};
