import React from "react";
import {Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
const checkAuth = ({ children }) => {
  // eslint-disable-next-line
  const auth=useSelector((state)=>state.auth)
  return !auth.isAuthenticated?children:<Navigate to="/"/>;
};

export default checkAuth;
