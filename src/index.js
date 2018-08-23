import React from "react";
import ReactDOM from "react-dom";

import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import promise from "redux-promise";
import multi from "redux-multi";
import thunk from "redux-thunk";

import App from "./App";
import reducers from "./utils/reducer/reducers";
import "./styles/css/index.css";

const devTools =
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
const store = applyMiddleware(multi, promise, thunk)(createStore)(
  reducers,
  devTools
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
