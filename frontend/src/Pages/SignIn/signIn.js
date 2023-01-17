import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './signIn.css'


export default function SignIn() {
 const navigate = useNavigate();
 const [email, setEmail] = useState('');
 const [password, setPassword] = useState('');
 const [error, setError] = useState('');

 const loginHandler = (a) => {
    a.preventDefault();
    try {
      fetch('http://localhost:5000/signIn', {
        method: 'POST',
        body: JSON.stringify({email, password}),
        headers: {"Content-Type": "application/json"}
      })
      .then((res) => 
        res.json()
      )
      .then((data) => {
        console.log(data);
        if(data.error){
          setError(data.error);
        }else {
        localStorage.setItem('token', data.token);
        localStorage.setItem('email', data.user);
        localStorage.setItem('firstName', data.fName)
        localStorage.setItem('lasttName', data.lName)
        navigate('/Dashboard');
        }
        
      })
    } catch (error) {
      console.log(error)  
    }
 }

  return (
    <div className='signIn-container'>
      <form>
        <h1 className='h-blue'>Sign In</h1>
        <label>Enter your email</label>
        <input type="text" name="email" required onChange={(e) => setEmail(e.target.value)} />
        <label>Enter your password</label>
        <input type="text" name="password" required onChange={(e) => setPassword(e.target.value)} />
        <div className="error">{error}</div>
        <button onClick={loginHandler}>LogIn</button>
      </form>
    </div>
  )
}
