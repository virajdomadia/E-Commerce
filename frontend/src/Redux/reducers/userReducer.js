import { SET_USER, LOGOUT_USER } from "../actions/types";

const initialState = {
  userInfo: JSON.parse(localStorage.getItem("userInfo")) || null, // Check if user is already logged in
  loading: false,
  error: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      // Save user info and token to localStorage
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
      return { ...state, userInfo: action.payload };

    case LOGOUT_USER:
      // Remove user info and token from localStorage on logout
      localStorage.removeItem("userInfo");
      return { ...state, userInfo: null };

    default:
      return state;
  }
};

export default userReducer;
