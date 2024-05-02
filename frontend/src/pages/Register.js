import React, { useState ,useEffect} from 'react'
import { Link,useNavigate} from 'react-router-dom'
import loader from "../assets/loader.gif"
import mylogog from "../assets/mylogog.png"
import axios from "axios"
import {ToastContainer, toast} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import './pages.css'

const Register = () => {

  const navigate= useNavigate()

  const [values, setValues] = useState({
    username: "", password: "", email: "", confirmpassword: ""
  })
  const {password,confirmpassword,email,username}=values 

  const onchangeEvent = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  
  console.log(values)

  
  useEffect(()=>{
    if(localStorage.getItem("registeredUser")){
      navigate("/")
    }
  },[])

  const handaleSubmitEvent =async (e) => {
    e.preventDefault()
    if(handleValidationEvent()){
      const {password,confirmpassword,email,username}=values 
      const {data}=await axios.post("http://localhost:5000/api/auth/register",{username,password,email})
      if(data.status===true){
        toast.success("Created user Successfully!",toastOptions)
        localStorage.setItem("registeredUser",JSON.stringify(data.user))
        navigate("/")
      }
      if (data.status===false){
        toast.error(data.message,toastOptions)
      }
      setValues({
        username: "", password: "", email: "", confirmpassword: ""
      })
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
    const {password,confirmpassword,email,username}=values 

    if (password!==confirmpassword){
      toast.error("Password and Confirm Password Should be Same",toastOptions)
      return false
    }
    else if (username===""){
      toast.error("Username is Required",toastOptions)
      return false
    }
    else if (email===""){
      toast.error("Email is Required",toastOptions)
      return false
    }
    else if (password.length < 8){
      toast.error("Password Must be Greater than 8 characters",toastOptions)
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
          <label className='labelHead'>Email</label>
          <input placeholder='Email' value={email} name="email" type='email' className='input' onChange={(e) => onchangeEvent(e)} />
        </div>

        <div className='inputContainer'>
          <label className='labelHead'>Password</label>
          <input placeholder='Password' value={password} name="password" type='text' className='input' onChange={(e) => onchangeEvent(e)} />
        </div>

        <div className='inputContainer'>
          <label className='labelHead'>Confirm Password</label>
          <input placeholder='Confirm Password' value={confirmpassword} name="confirmpassword" type='text' className='input' onChange={(e) => onchangeEvent(e)} />
        </div>


        <button type='submit' className='button'>Create User</button>
        <p className='existPara'>Already a user? <span><Link to="/login" className='span'>Login</Link></span></p>

      </form>
      <ToastContainer/>
    </div>
  )
}

export default Register