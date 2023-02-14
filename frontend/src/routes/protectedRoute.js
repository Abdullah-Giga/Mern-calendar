import React from "react";

import {Navigate, Outlet } from "react-router-dom";
import { outLocal } from "../utils/Users/HelperFunctions";

const protectedRoute = () => {

    const token = outLocal('token')

  
  return (
            !token ?
            <Navigate to = '/SignIn'/>
            :
            <Outlet/>
  );
};

export default protectedRoute;
