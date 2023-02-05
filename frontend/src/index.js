import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { authReducers, activeTabReducers } from "./bootstrap/reducers";
//redux
import { Provider } from "react-redux";
import { combineReducers, applyMiddleware, createStore } from "redux";
//sagas
import createSagaMiddleware from "redux-saga";
import mySaga from "./bootstrap/sagas";
import axios from "axios";
//persist
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { PersistGate } from "redux-persist/integration/react";

axios.defaults.withCredentials = true;

//config persist
const persistConfig = {
  key: "root",
  storage,
};
//config redux-saga
const rootReducers = combineReducers({ authReducers, activeTabReducers });
const persistedReducer = persistReducer(persistConfig, rootReducers);
const sagaMiddleware = createSagaMiddleware();
const store = createStore(persistedReducer, applyMiddleware(sagaMiddleware));
let persistor = persistStore(store);
sagaMiddleware.run(mySaga);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
