// Import necessary modules and libraries from React and React Router
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

// A custom component for checking user authentication
export default function CheckAuth({ children }) {
  // Retrieve authentication information from Redux store
  const auth = useSelector((state) => state.auth);

  // Check if the user is authenticated
  // If authenticated, render the children (protected content)
  // If not authenticated, redirect the user to the login page
  return auth.isAuthenticated ? (
    children
  ) : (
    <Navigate to="/login" /> // Redirect to the login page
  );
}
