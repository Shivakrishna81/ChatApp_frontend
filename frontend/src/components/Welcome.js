import React from 'react'
import Robot from '../assets/robot.gif'
import './Components.css'
const Welcome = ({currentUser}) => {
  return (
    <div className='welcomeContainer'>
       <img src={Robot} alt="robot" className='robot'/>
       <h1 className='robotUsername'>Welcome. <span>{currentUser?.username}!</span></h1>
       <h3 className='robotHead'>Please Select a Contact and Start Messaging...!!</h3>
    </div>
  )
}

export default Welcome