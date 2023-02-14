import React from "react";

import {Navigate,  Outlet } from "react-router-dom";
import { outLocal } from "../utils/Users/HelperFunctions";

const publicRoute = () => {

    const token = outLocal('token')

  
  return (
            !token ?
            <Outlet/>
            :
            <Navigate to = '/Dashboard'/>
  );
};

export default publicRoute;
