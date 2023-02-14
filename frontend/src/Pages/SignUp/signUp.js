import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../SignIn/signIn.css";
import PasswordChecklist from "react-password-checklist";
import { SIGNUP, PasswordInstructions } from "../../Constants/User/userConsants";
import axios from "axios";
import { inLocal } from "../../utils/Users/HelperFunctions";

export default function SignUp() {
  const navigate = useNavigate(),
    [data, setData] = useState({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      passwordAgain: "",
    });

  const [error, setError] = useState("");

  const submitHandler = (a) => {
    a.preventDefault();
    axios
      .post(SIGNUP, {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
      })
      .then((res) => {
        if (res.data.token) {
          inLocal(res.data); // Sets user data in local storage
          navigate("/Dashboard");
          console.log(res);
        }
      })
      .catch((err) => {
        setError(err.response.data.error);
      });
  };

  return (
    <div className="signIn-container">
      <form>
        <h1 className="h-blue">Sign Up</h1>
        <label>Enter your first name</label>
        <input
          type="text"
          name="firstName"
          required
          onChange={(e) =>
            setData({
              ...data,
              firstName: e.target.value,
            })
          }
        />
        <label>Enter your last name</label>
        <input
          type="text"
          name="lastName"
          required
          onChange={(e) =>
            setData({
              ...data,
              lastName: e.target.value,
            })
          }
        />
        <label>Enter your email</label>
        <input
          type="text"
          name="email"
          required
          onChange={(e) =>
            setData({
              ...data,
              email: e.target.value,
            })
          }
        />
        <label>Enter your password</label>
        <input
          type="password"
          name="password"
          required
          onChange={(e) =>
            setData({
              ...data,
              password: e.target.value,
            })
          }
        />
        <label>Confirm password</label>
        <input
          type="password"
          name="passwordAgain"
          required
          onChange={(e) =>
            setData({
              ...data,
              passwordAgain: e.target.value,
            })
          }
        />
        <div className="error">{error}</div>
        <PasswordChecklist
          rules={["minLength", "specialChar", "number", "capital", "match"]}
          minLength={8}
          value={data.password}
          valueAgain={data.passwordAgain}
          onChange={(isValid) => {
            const btn = document.querySelector(".signUp-btn");
            console.log(btn);
            if (isValid) {
              btn.disabled = false;
            } else {
              btn.disabled = true;
            }
          }}
          messages={PasswordInstructions}
        />
        <button className="signUp-btn" onClick={submitHandler}>
          SignUp
        </button>
      </form>
    </div>
  );
}
