export const LOGIN = "LOGIN";
export const ME = "ME";
export const GET_ME_SUCCESS = "GET_ME_SUCCESS";
export const GET_ME_FAILURE = "GET_ME_FAILURE";
export const RESET = "RESET";
export const LOGOUT = "LOGOUT";
export const TAB_ACTIVE = "TAB_ACTIVE";
export const PAGE_ACTIVE = " PAGE_ACTIVE";

export const login = (payload) => ({
  type: LOGIN,
  payload,
});
export const getMe = () => ({
  type: ME,
});
export const getMeSuccess = (payload) => ({
  type: GET_ME_SUCCESS,
  payload,
});
export const getMeFailure = (payload) => ({
  type: GET_ME_FAILURE,
  payload,
});
export const reset = () => ({
  type: RESET,
});
export const logOut = () => ({
  type: LOGOUT,
});
export const tabActive = (payload) => ({
  type: TAB_ACTIVE,
  payload,
});
export const pageActive = (payload) => ({
  type: PAGE_ACTIVE,
  payload,
});
