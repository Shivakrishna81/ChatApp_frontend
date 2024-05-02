import React,{useState,useEffect,useRef} from 'react'
import Logout from './Logout'
import ChatInput from './ChatInput'
import './Components.css'
import { v4 as uuidv4 } from "uuid";
import axios from "axios"

const ChatContainer = ({currentChat,currentUser,socket}) => {
   
  const [messages,setMessages]=useState([])
  const scrollRef = useRef();
  const [arrivalMessage, setArrivalMessage] = useState(null);

  useEffect(()=>{
    const messageFunction=async ()=>{
     if(currentChat){
      const response=await axios.post("http://localhost:5000/api/messages/getAllMessage",{
        from : currentUser._id,
        to: currentChat._id,
      });
      setMessages(response.data)
      // console.log(response.data)
     }
    }

    messageFunction()
  },[messages])

  const handleSendMsg=async(msg)=>{
        await axios.post("http://localhost:5000/api/messages/addMessage",{
          from:currentUser._id,
          to: currentChat._id,
          message: msg
        })
        socket.current.emit("send-msg",{
            to:currentChat._id,
            from:currentUser._id,
            message:msg,
        })

        const msgs=[...messages]
        msgs.push({fromSelf:true, message:msg})
        setMessages(msgs)
  }  


  useEffect(()=>{
    if(socket.current){
      socket.current.on("msg-recieve",(msg)=>{
            setArrivalMessage({fromSelf:false, message:msg})
      })
    }
  },[])

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);


  return (
    <>
    {currentChat && (
      <div className='chat-container'>
      <div className='chat-header'>
         <div className='user-details'>
           <div className='avatar'>
           <img src={`data:image/svg+xml;base64,${currentChat.avatarImg}`} alt="avatar" className='avatarImg' />
           </div>                        
               <div>
                 <h3 className='username'>{currentChat.username}</h3>
               </div>
           
         </div>
         <Logout/>
      </div>
      <div className='chat-messages'>
        {
          messages.map((message)=>{
            return (
              <div ref={scrollRef} key={uuidv4()}>
                <div className={`message ${message.fromSelf?"sended":"recieved"}`}>
                  <div className='content'>
                  <p>{message.message}</p>  
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>
      <ChatInput handleSendMsg={handleSendMsg}/>
   </div>
    )}
    </>
  )
}

export default ChatContainer