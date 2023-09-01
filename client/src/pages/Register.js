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
import * as React from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";

// A React component for the Register page
export default function Register() {
  // Use the `useNavigate` hook to manage navigation
  const navigate = useNavigate();

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    // Extract form data
    const form = {
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      email: data.get("email"),
      password: data.get("password"),
    };

    // Send a POST request to the server for user registration
    const res = await fetch(`${process.env.REACT_APP_BASE_URL}/auth/register`, {
      method: "POST",
      body: JSON.stringify(form),
      headers: {
        "content-type": "application/json",
      },
    });

    if (res.ok) {
      // If registration is successful, navigate to the login page
      navigate("/");
    }
  };

  // Render the Register page
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

        {/* Title */}
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>

        {/* Registration form */}
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            {/* First Name input */}
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid>

            {/* Last Name input */}
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
              />
            </Grid>

            {/* Email input */}
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>

            {/* Password input */}
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
              />
            </Grid>
          </Grid>

          {/* Sign Up button */}
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Sign Up
          </Button>

          {/* Link to the login page */}
          <Grid container justifyContent="flex-end">
            <Grid item>
              <RouterLink to="/login">
                <Link component="span" variant="body2">
                  Already have an account? Sign in
                </Link>
              </RouterLink>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
