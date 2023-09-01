// Import necessary modules and components from React Router and your application
import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Category from "./pages/Category";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CheckAuth from "./utils/CheckAuth";
import Guest from "./utils/Guest";

// Create and export a BrowserRouter configuration
export default createBrowserRouter([
  {
    element: <App />, // The top-level component for your application
    children: [
      {
        path: "/", // Define the route path
        element: (
          <CheckAuth>
            <Home /> {/* Render the Home component with authentication check */}
          </CheckAuth>
        ),
      },
      {
        path: "/login", // Define the route path for login
        element: (
          <Guest>
            <Login /> {/* Render the Login component for guests */}
          </Guest>
        ),
      },
      {
        path: "/register", // Define the route path for registration
        element: (
          <Guest>
            <Register /> {/* Render the Register component for guests */}
          </Guest>
        ),
      },
      {
        path: "/category", // Define the route path for the category page
        element: (
          <CheckAuth>
            <Category /> {/* Render the Category component with authentication check */}
          </CheckAuth>
        ),
      },
    ],
  },
]);
