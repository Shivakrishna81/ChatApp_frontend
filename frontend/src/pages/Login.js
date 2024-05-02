import React, { useEffect, useState } from 'react'
import { Link,useNavigate} from 'react-router-dom'
import loader from "../assets/loader.gif"
import mylogog from "../assets/mylogog.png"
import axios from "axios"
import {ToastContainer, toast} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import './pages.css'

const Login = () => {

  const navigate= useNavigate()

  const [values, setValues] = useState({
    username: "", password: ""
  })
  const {password,username}=values 

  const onchangeEvent = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }


  useEffect(()=>{
    if(localStorage.getItem("registeredUser")){
      navigate("/")
    }
  },[])

  const handaleSubmitEvent =async (e) => {
    e.preventDefault()
    if(handleValidationEvent()){
      const {password,username}=values 
      try{

        const {data}=await axios.post("http://localhost:5000/api/auth/login",{username,password})
      if(data.status===true){
        console.log(data)
        localStorage.setItem("registeredUser",JSON.stringify(data.validateUsername))
        navigate("/")
      }
      if (data.status===false){
        toast.error(data.message,toastOptions)
      }
      setValues({
        username: "", password: "",
      })

      }
      catch(err){
        toast.error(err,toastOptions)
      }
    }
    
  }

  const toastOptions={
    position:"top-right",
    autoClose:8000,
    pauseOnHover:true,
    draggable:true,
    theme:"dark"
  }

  const handleValidationEvent=()=>{
    const {password,username}=values 

    
    if (username===""){
      toast.error("Username is Required",toastOptions)
      return false
    }
    else if (password===""){
      toast.error("Password is Required",toastOptions)
      return false
    }
    return true
  }


  return (
    <div className='mainContainer'>
      <form onSubmit={(e) => handaleSubmitEvent(e)}>
        <div className='logoContainer'>
          <img src={mylogog} className='logo' />
          <h1 className="logohead">Straap!</h1>
        </div>
        <div className='inputContainer'>
          <label className='labelHead'>Username</label>
          <input placeholder='Username' value={username} name="username" type='text' className='input' onChange={(e) => onchangeEvent(e)} />
        </div>

        <div className='inputContainer'>
          <label className='labelHead'>Password</label>
          <input placeholder='Password' value={password} name="password" type='text' className='input' onChange={(e) => onchangeEvent(e)} />
        </div>

        <button type='submit' className='button'>Login</button>
        <p className='existPara'>Don't have an account? <span><Link to="/register" className='span'>Register</Link></span></p>

      </form>
      <ToastContainer/>
    </div>
  )
}

export default Login