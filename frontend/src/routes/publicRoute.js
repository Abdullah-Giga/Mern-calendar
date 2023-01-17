import React from "react";

import {Navigate,  Outlet } from "react-router-dom";

const publicRoute = () => {

    const token = localStorage.getItem('token');

  
  return (
            !token ?
            <Outlet/>
            :
            <Navigate to = '/Dashboard'/>
  );
};

export default publicRoute;
