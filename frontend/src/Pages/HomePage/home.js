import React from 'react'
import './home.css'
import img from '../../Assets/calendar.png'
import { Link } from 'react-router-dom'


export default function home() {
  return (
    <div className='landing-container'>
    <div className='landing-image'>
        <img src = {img} alt = ""/>
    </div>
    <div className='landing-content'>
        <h3>My Calendar</h3>
        <Link to='/SignIn'><button className='landing-btn'>Get Started</button></Link>
    </div>
</div>
  )
}
