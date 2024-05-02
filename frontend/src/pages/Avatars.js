import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import loader from "../assets/loader.gif"
import axios from "axios"
import {Buffer} from "buffer"
import { ToastContainer, toast, } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import './pages.css'



const Avatars = () => {

    //   it is an opensource url for avatars we can pass random numbers at endpoints to generate 
    const avatarsApi = "https://api.multiavatar.com/45678945"
    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState(true)
    const [avatars, setAvatars] = useState([])
    const [selectedAvatar, setSelectedAvatar] = useState(undefined)
    const toastOptions = {
        position: "top-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark"
    }
    useEffect(()=>{
        if(!localStorage.getItem("registeredUser")){
          navigate("/login")
        }
      },[])

   const setProfile= async ()=>{
       if (selectedAvatar===undefined){
        toast.error("Please select an avatar",toastOptions)
       }
       else{
        const user=await JSON.parse(localStorage.getItem("registeredUser"))
        // console.log("userrrrrrrrrrrrr=>",user)
        const {data}=await axios.post(`http://localhost:5000/api/auth/setavatar/${user._id}`,{image:avatars[selectedAvatar]})

        if (data.isSet){
            user.isAvatarImageSet=true
            user.avatarImg=data.image;
            localStorage.setItem("registeredUser",JSON.stringify(user));
            navigate("/")
        }
        else{
            toast.error("Error setting avatar, Plase try again later",toastOptions)
        }
       }
   }
    useEffect(()=>{
        const asyncfn= async ()=>{
            const data=[];
        for (let i=0; i<4; i++){
            const image= await axios.get(`${avatarsApi}/${Math.round(Math.random()*1000)}`);
            const buffer=new Buffer(image.data);
            data.push(buffer.toString("base64"));
        }
        setAvatars(data)
        setIsLoading(false)
        };
        asyncfn()
    },[])



    return (
        <>
        {
            isLoading?<div className='loaderContainer'>
                <img src={loader} alt="loader" className='loader'/>
                <h1>Images are Loading</h1>
            </div>:<div className='avatarMainContiner'> 
               
               <h1 className='pickHead'>Pick an avatar as your profile picture</h1>

               <div className='avatars'>
                    {avatars.map((avatar,index)=>{
                        return(
                            <div className={`avatar ${selectedAvatar===index?"selected":""}`} key={index} > 
                            <img src={`data:image/svg+xml;base64,${avatar}`} alt="avatar"  onClick={()=>setSelectedAvatar(index)}/>
                            </div>
                        )
                    })}
               </div>

               <buton className="submit-btn" onClick={setProfile}>Set as Profile Picture</buton>
            </div>
        }
    
            <ToastContainer />
        </>

    )
}

export default Avatars