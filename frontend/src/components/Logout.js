import React from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios'
import {BiPowerOff} from 'react-icons/bi'
import './Components.css'

const Logout = () => {
    const navigate=useNavigate()

    const onClickLogout=async()=>{
        localStorage.clear();
        navigate("/login")
    }

  return (
    <button className='logout-button' onClick={onClickLogout}>
        <BiPowerOff/>
    </button>
  )
}

export default Logout