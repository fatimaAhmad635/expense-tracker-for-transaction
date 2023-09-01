// Import necessary modules and libraries from React and Material-UI
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Cookie from "js-cookie";
import * as React from "react";
import { useDispatch } from "react-redux";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { setUser } from "../store/auth.js";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// A React component for the Login page
export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const form = {
      email: data.get("email"),
      password: data.get("password"),
    };

    // Send a POST request to the server for user login
    const res = await fetch(`${process.env.REACT_APP_BASE_URL}/auth/login`, {
      method: "POST",
      body: JSON.stringify(form),
      headers: {
        "content-type": "application/json",
      },
    });

    // Parse the response data
    const { token, user } = await res.json();

    if (res.ok) {
      // Set the JWT token in cookies
      Cookie.set("token", token);

      // Update user data in Redux store
      await dispatch(setUser(user));

      // Navigate to the home page
      navigate("/");
    } else {
      // Display an error toast if login fails
      toast.error("Email or Password are Incorrect");
    }
  };

  // Render the Login page
  return (
    <Container>
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Avatar icon */}
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>

        {/* Toast notifications */}
        <ToastContainer
          position="top-center"
          theme="light"
        />

        {/* Title */}
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>

        {/* Login form */}
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          {/* Email input */}
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />

          {/* Password input */}
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />

          {/* Sign In button */}
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Sign In
          </Button>

          {/* Link to Sign Up */}
          <Grid container>
            <Grid item>
              <RouterLink to="/register">
                <Link component="span" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </RouterLink>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
