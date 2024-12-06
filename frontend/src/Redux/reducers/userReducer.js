import { SET_USER, LOGOUT_USER } from "../actions/types";

const initialState = {
  userInfo: null,
  loading: false,
  error: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, userInfo: action.payload };
    case LOGOUT_USER:
      return { ...state, userInfo: null };
    default:
      return state;
  }
};

export default userReducer;
