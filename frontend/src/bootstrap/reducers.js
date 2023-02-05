import {
  LOGIN,
  LOGOUT,
  TAB_ACTIVE,
  PAGE_ACTIVE,
  GET_ME_SUCCESS,
  GET_ME_FAILURE,
} from "./actions";

const inisialState = {
  user: null,
};

export const authReducers = (state = inisialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOGIN:
      return {
        ...state,
        user: payload,
      };
    case GET_ME_SUCCESS:
      return {
        ...state,
        user: payload,
      };
    case GET_ME_FAILURE:
      return {
        ...state,
        user: null,
      };
    case LOGOUT:
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};

export const activeTabReducers = (state = { tab: "", page: "" }, action) => {
  const { type, payload } = action;
  switch (type) {
    case TAB_ACTIVE:
      return {
        ...state,
        tab: payload,
      };
    case PAGE_ACTIVE:
      return {
        ...state,
        page: payload,
      };
    case LOGOUT:
      return {
        ...state,
        tab: "",
        page: "",
      };
    default:
      return state;
  }
};
