import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { outLocal } from "../../utils/Users/HelperFunctions";
import "./header.css";

export default function Header() {
  const [email, setEmail] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  
  const token = outLocal("token");

  // Checking if the user is logged in 
  const checkUser = () => {
    if (token) {
      const user_email = outLocal("email");
      setEmail(user_email);
      setLoggedIn(true);
    }
  };

  const logout = () => {
    setLoggedIn(false)
    localStorage.clear();
  };

  useEffect(() => {
    checkUser();
  });


  
  return (
    <div className="header-container">
      <div className="logo">
        <Link to="/">
          <h1>My React App</h1>
        </Link>
      </div>
      {loggedIn ? (
        <div className="links">
          <Link to="/Dashboard"> {email}</Link>
          <Link to="/" onClick={logout}>
            Logout
          </Link>
        </div>
      ) : (
        <div className="links">
          <Link to="/SignIn">Login</Link>
          <Link to="/SignUp">SignUp</Link>
        </div>
      )}
    </div>
  );
}
