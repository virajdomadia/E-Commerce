import axios from "axios";
import { SET_USER, LOGOUT_USER } from "./types";

// Action to set the user after signup or login
export const setUser = (userData) => {
  return {
    type: SET_USER,
    payload: userData,
  };
};

// Action to log out the user (clear user data from Redux store)
export const logoutUser = () => {
  return {
    type: LOGOUT_USER,
  };
};

// Signup action to handle user registration
export const signup = (userData) => async (dispatch) => {
  try {
    // Send a POST request to the backend to register the user
    const { data } = await axios.post("/api/users/register", userData);

    // If signup is successful, set the user in Redux
    dispatch({
      type: SET_USER,
      payload: data.user, // You can modify this to handle any other relevant data
    });

    // Return the response for further handling (success or failure)
    return Promise.resolve(data);
  } catch (error) {
    // If there is an error during signup, reject the promise
    return Promise.reject(
      error.response ? error.response.data.message : error.message
    );
  }
};
