import React from 'react'
import './home.css'
// import Header from '../../Components/Header/header'
import img from '../../Assets/calendar.png'
import { Link } from 'react-router-dom'


export default function home() {
  const user = localStorage.getItem('email');
  return (
    <div className='landing-container'>
    <div className='landing-image'>
        <img src = {img} alt = ""/>
    </div>
    <div className='landing-content'>
        <h3>My Calendar</h3>
        <button className='landing-btn'>Get Started</button>
    </div>
</div>
  )
}
