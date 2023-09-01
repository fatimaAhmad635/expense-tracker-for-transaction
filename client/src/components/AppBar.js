// Import necessary modules and libraries from Material-UI and React
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Cookies from "js-cookie";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../store/auth.js";

// A React component for the application's top navigation bar
export default function ButtonAppBar() {
  // Use the `useNavigate` hook to manage navigation
  const navigate = useNavigate();

  // Get the authentication status from the Redux store
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  // Get the dispatch function to dispatch actions to the Redux store
  const dispatch = useDispatch();

  // Function to handle user logout
  function _logout() {
    // Remove the authentication token stored in cookies
    Cookies.remove("token");

    // Dispatch the logout action to update the Redux store
    dispatch(logout());

    // Navigate the user to the login page
    navigate("/login");
  }

  // Render the top navigation bar
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          {/* Application title with a link to the home page */}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link className="text-white" to="/">
              Expensor
            </Link>
          </Typography>

          {/* Render navigation buttons based on authentication status */}
          {isAuthenticated && (
            <>
              {/* Link to the Category page */}
              <Link to="/category" className="text-white">
                <Button color="inherit">Category</Button>
              </Link>

              {/* Logout button */}
              <Button color="inherit" onClick={_logout}>
                Logout
              </Button>
            </>
          )}

          {!isAuthenticated && (
            <>
              {/* Link to the Login page */}
              <Link to="/login" className="text-white">
                <Button color="inherit">Login</Button>
              </Link>

              {/* Link to the Register page */}
              <Link to="/register" className="text-white">
                <Button color="inherit">Register</Button>
              </Link>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
