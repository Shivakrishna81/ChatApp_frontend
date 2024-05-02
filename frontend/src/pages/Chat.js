import React,{useState,useEffect,useRef} from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom'
import Contacts from '../components/Contacts'
import Welcome from '../components/Welcome'
import './pages.css'
import ChatContainer from '../components/ChatContainer'
import {io} from "socket.io-client";
const Chart=()=>{
  const socket=useRef()
  const  navigate=useNavigate() 
  const [contacts,setContacts]=useState([]);
  const [user,setUser]=useState(undefined)
  const [currentChat,setCurrentChat]=useState(undefined)

  useEffect( () =>{
      if(!localStorage.getItem("registeredUser")){
        navigate("/login")
      }
  },[])

  useEffect(()=>{
    if (user){
      socket.current=io("http://localhost:5000");
      socket.current.emit("add-user",user._id)
    }
  })

  useEffect(()=>{
        const asyncFun= async ()=>{
          const currentUser=await JSON.parse(localStorage.getItem("registeredUser"));
           setUser(currentUser)
          // console.log(currentUser);
          if (currentUser){
            if(currentUser.isAvatarImageSet){
              const data=await axios.get(`http://localhost:5000/api/auth/getAllUsers/${currentUser._id}`);
               setContacts(data.data)
               console.log(data)
               console.log("called")
            }
            else{
              navigate("/avatar")
            }
          }
         else{
          console.log("not called");
         } 
        }
        asyncFun()
    
  },[])

  const handleChangeChat=(chat)=>{
    setCurrentChat(chat)
  }

  return (
    <div className='chatMainContainer'>
           <div className='chatContainer'>
              <Contacts contacts={contacts} currentUser={user} changeChat={handleChangeChat}/>
              {
                currentChat===undefined?(<Welcome currentUser={user}/>):<ChatContainer currentChat={currentChat} currentUser={user} socket={socket}/>
              }
              
           </div> 
    </div>

  )
}

export default Chart