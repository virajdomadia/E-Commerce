import {
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  SET_USER,
} from "../actions/types";

const initialState = {
  loading: false,
  userInfo: null,
  error: null,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
    case USER_LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case USER_REGISTER_SUCCESS:
    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        userInfo: action.payload,
        error: null,
      };

    case USER_REGISTER_FAIL:
    case USER_LOGIN_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case USER_LOGOUT:
      return {
        ...state,
        userInfo: null,
      };

    case SET_USER:
      return {
        ...state,
        userInfo: action.payload,
      };

    default:
      return state;
  }
};
