// Import necessary modules and libraries from React and your application
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import router from "./routes.js"; // Import your application's router configuration
import store from "./store/index.js"; // Import your Redux store configuration

// Create a React root for rendering
const root = ReactDOM.createRoot(document.getElementById("root"));

// Render your application within the root
root.render(
  <Provider store={store}> {/* Provide the Redux store to your application */}
    <RouterProvider router={router}> {/* Provide the router to your application */}
      {/* Your application components and views will be rendered here */}
    </RouterProvider>
  </Provider>
);
