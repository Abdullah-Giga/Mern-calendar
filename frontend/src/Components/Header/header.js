import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './header.css'

export default function Header() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [loggedIn, setLoggedIn] = useState();
  

  const checkUser = () => {
    if(localStorage.getItem('token')){
      const user_email = localStorage.getItem('email');
      setEmail(user_email);
      setLoggedIn(true);
    }else{
      setLoggedIn(false);
    }
  }

  const logout = () => {
    localStorage.clear();
  }


  useEffect(() => {
    checkUser(); 
  })




  return (
    <div className='header-container'>
        <div className='logo'>
            <Link to="/"><h1>My React App</h1></Link>
        </div>
        {loggedIn ? (
          <div className='links'>
          <Link to='/MyTasks'> {email}</Link>
          <Link to='/' onClick={logout}>Logout</Link>
      </div>
        ) : (
          <div className='links'>
          <Link to='/SignIn'>Login</Link>
          <Link to='/SignUp'>SignUp</Link>
      </div>
        )}
    </div>
  )
}
