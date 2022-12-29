import { useEffect,useState } from "react";
import Cookies from "js-cookie";
import { Navigate, redirect } from "react-router-dom";
import { useSelector } from "react-redux";
const checkAuth = ({ children }) => {
  // eslint-disable-next-line
  const auth=useSelector((state)=>state.auth)
  return auth.isAuthenticated?children:<Navigate to="/login"/>;
};

export default checkAuth;
