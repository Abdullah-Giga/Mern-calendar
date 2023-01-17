import React from "react";

import {Navigate, Outlet } from "react-router-dom";

const protectedRoute = () => {

    const token = localStorage.getItem('token');

  
  return (
            !token ?
            <Navigate to = '/SignIn'/>
            :
            <Outlet/>
  );
};

export default protectedRoute;
