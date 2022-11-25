import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import axios from "axios";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import store from "./redux/store";

// axios.defaults.baseURL = process.env.REACT_APP_BACK_URL; // cuando querramos trabajar y/o probar nuestro proyecto de forma local
axios.defaults.baseURL = process.env.REACT_APP_DEPLOY_BACK_URL; // cuando querramos pushear o actualizar nuestro deploy del front

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
