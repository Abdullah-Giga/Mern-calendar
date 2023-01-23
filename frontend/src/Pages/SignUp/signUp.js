import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import '../SignIn/signIn.css'
import PasswordChecklist from "react-password-checklist"

export default function SignUp() {

 const navigate = useNavigate();
 const [firstName, setFirstName] = useState('');
 const [lastName, setLastName] = useState('');
 const [email, setEmail] = useState('');
 const [password, setPassword] = useState('');
 const [passwordAgain, setPasswordAgain] = useState("");
 const [error, setError] = useState('');

 

const submitHandler = (a) => {

  a.preventDefault();
    try {
      fetch('http://localhost:5000/signUp', {
        method: "POST",
        body: JSON.stringify({firstName, lastName ,email, password}),
        headers: {"Content-Type": "application/json"},
      }).then((res)=>{
        res.json()
        .then((data)=>{
          if(data.error){
            console.log(data.error);
            setError(data.error);
          }
          if(data.token){
            localStorage.setItem('token', data.token);
            localStorage.setItem('email', data.user);
            localStorage.setItem('firstName', data.fName)
            localStorage.setItem('lasttName', data.lName)
            navigate('/Dashboard');
          }
        })
      })

    } catch (error) {
      console.log(error);
    }
}

  return (
    <div className='signIn-container'>
    <form>
      <h1 className='h-blue'>Sign Up</h1>
      <label>Enter your first name</label>
      <input type="text" name="firstName" required onChange={(e) => setFirstName(e.target.value)} />
      <label>Enter your last name</label>
      <input type="text" name="lastName" required onChange={(e) => setLastName(e.target.value)} />
      <label>Enter your email</label>
      <input type="text" name="email" required  onChange={(e) => setEmail(e.target.value)} />
      <label>Enter your password</label>
      <input type="password" name="password" required onChange={(e) => setPassword(e.target.value)} />
      <label>Confirm password</label>
      <input type="password" name="passwordAgain" required onChange={(e) => setPasswordAgain(e.target.value)} />
      <div className="error">{error}</div>
      <PasswordChecklist
				rules={["minLength","specialChar","number","capital","match"]}
				minLength={8}
				value={password}
				valueAgain={passwordAgain}
        onChange={(isValid) => {
          const btn = document.querySelector('.signUp-btn');
          console.log(btn);
          if(isValid){
            btn.disabled = false;
          }else{
            btn.disabled = true;
          }
        }}
				messages={{
					minLength: "Password must be minimum 8 characters",
					specialChar: "Passwprd must contain 1 special character",
					number: "Passwprd must contain 1 number",
					capital: "Passwprd must contain 1 capital letter",
					match: "Passwords do not match",
				}}
			/>
      <button className='signUp-btn' onClick={submitHandler}>SignUp</button>
    </form>
  </div>
  )
}
