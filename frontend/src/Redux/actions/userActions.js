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
      payload: data.user, // Modify this to handle any other relevant data
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

// Login action to handle user login (with JWT token)
export const login = (userData) => async (dispatch) => {
  try {
    // Send a POST request to the backend to login the user
    const { data } = await axios.post("/api/users/login", userData);

    // If login is successful, store the JWT token in localStorage
    localStorage.setItem("userToken", data.token);

    // Set the user in Redux (include the token for protected routes)
    dispatch({
      type: SET_USER,
      payload: data.user, // Ensure the data returned includes the user info and token
    });

    // Return the response for further handling
    return Promise.resolve(data);
  } catch (error) {
    // If there is an error during login, reject the promise
    return Promise.reject(
      error.response ? error.response.data.message : error.message
    );
  }
};

// Action to auto-login (on app load)
export const autoLogin = () => async (dispatch) => {
  const userToken = localStorage.getItem("userToken");

  if (userToken) {
    try {
      // Make a request to the backend to verify the token and get user data
      const { data } = await axios.get("/api/users/profile", {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });

      // If the token is valid, set the user in Redux
      dispatch({
        type: SET_USER,
        payload: data,
      });
    } catch (error) {
      // If there's an error (e.g., token is invalid), logout the user
      dispatch(logoutUser());
    }
  }
};

// Action to logout the user (remove the token and user data)
export const logout = () => (dispatch) => {
  // Remove the token from localStorage
  localStorage.removeItem("userToken");

  // Dispatch the logout action to clear the user data from Redux store
  dispatch(logoutUser());
};
