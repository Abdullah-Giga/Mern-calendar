import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./signIn.css";
import { SIGNIN } from "../../Constants/User/userConsants";
import { inLocal } from "../../utils/Users/HelperFunctions";

export default function SignIn() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: '',
    password: '',
  })

  const [error, setError] = useState("");

  const loginHandler = (a) => {
    a.preventDefault();
    axios
      .post(SIGNIN, {
        email: user.email,
        password: user.password,
      })
      .then((res) => {
        if (res.data.token) {
          inLocal(res.data); // Sets user data in local storage
          navigate("/Dashboard");
        }
      })
      .catch((err) => {
        setError(err.response.data.error);
      });
  };

  return (
    <div className="signIn-container">
      <form>
        <h1 className="h-blue">Sign In</h1>
        <label>Enter your email</label>
        <input
          type="text"
          name="email"
          onChange={(e) => setUser({
            ...user,
            email: e.target.value
          })}
        />
        <label>Enter your password</label>
        <input
          type="password"
          name="password"
          required
          onChange={(e) => setUser({
            ...user,
            password: e.target.value
          })}
        />
        <div className="error">{error}</div>
        <button onClick={loginHandler}>LogIn</button>
      </form>
    </div>
  );
}
