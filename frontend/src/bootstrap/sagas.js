import { call, takeEvery, put } from "redux-saga/effects";
import { RESET, logOut, ME, getMeSuccess, getMeFailure } from "./actions";
import axios from "axios";

function* logout() {
  try {
    yield call(axios.delete, "http://localhost:5000/logout");
    yield put(logOut());
  } catch (error) {
    if (error.response) {
      // yield put(getMeFailure(error.response.data.msg));
    }
  }
}

function* getMe() {
  try {
    const response = yield call(axios.get, "http://localhost:5000/me");
    yield put(getMeSuccess(response.data));
  } catch (error) {
    if (error.response) {
      yield put(getMeFailure(error.response.data.msg));
    }
  }
}

function* mySaga() {
  yield takeEvery(RESET, logout);
  yield takeEvery(ME, getMe);
}

export default mySaga;
