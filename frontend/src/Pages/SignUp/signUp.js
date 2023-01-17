import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import '../SignIn/signIn.css'


export default function SignUp() {

 const history = useNavigate();
 const [firstName, setFirstName] = useState('');
 const [lastName, setLastName] = useState('');
 const [email, setEmail] = useState('');
 const [password, setPassword] = useState('');
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
            history('/Dashboard');
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
      <input type="text" name="password" required onChange={(e) => setPassword(e.target.value)} />
      <div className="error">{error}</div>
      <button onClick={submitHandler}>SignUp</button>
    </form>
  </div>
  )
}
