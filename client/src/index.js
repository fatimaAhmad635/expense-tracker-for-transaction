import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import router from "./routes.js";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/index.js";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Provider store={store}>
    <RouterProvider router={router}></RouterProvider>
    </Provider>
);

reportWebVitals();
