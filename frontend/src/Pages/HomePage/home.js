import React from 'react'
import './home.css'
// import Header from '../../Components/Header/header'
import time from '../../Assets/time.png'
import { Link } from 'react-router-dom'


export default function home() {
  const user = localStorage.getItem('email');
  return (
    <div className='home-container'>
        {/* <Header/> */}
            <div className='home-content'>
                <div className='image'>
                    <img src={time} alt="time"/>
                </div>
                <div className='Intro-text'>
                    <h1>My React App</h1>
                    <h3>Made in React JS</h3>
                    {user ?  
                    <Link to='/MyTasks'><button className='view-time'>View</button></Link>
                    : <Link to='/SignIn'><button className='view-time'>View</button></Link>
                    }
                </div>
            </div>
    </div>
  )
}
