import React, { useState, useEffect } from 'react'
import mylogog from "../assets/mylogog.png"
import "./Components.css"

const Contacts = ({ contacts, currentUser,changeChat }) => {

    const [currentUserName, setCurrentUserName] = useState(undefined)
    const [currentUserImage, setCurrentUserImage] = useState(undefined)
    const [currentSelected, setCurrentSelected] = useState(undefined)

    useEffect(() => {
        if (currentUser) {
            setCurrentUserImage(currentUser.avatarImg);
            setCurrentUserName(currentUser.username)
        }
    }, [currentUser])

    const changeCurrentChat=(index,contact)=>{
        setCurrentSelected(index)
        changeChat(contact)
    }

    return (
        <>
            {currentUserImage && currentUserName && (
                <div className='contactContainer'>
                    <div className='brand'>
                        <img src={mylogog} alt="logo" className='contactLogo'/>
                        <h3>Straap!</h3>
                    </div>
                    <div className='contacts'>
                        {
                            contacts.map((contact, index) => {
                                return (
                                    <div className={`contact ${index === currentSelected ? "selectedChat" : ""}`} key={index} onClick={()=>changeCurrentChat(index,contact)}>
                                        <div className='avatar'>
                                            <img src={`data:image/svg+xml;base64,${contact.avatarImg}`} alt="avatar" className='avatarImg' />
                                        </div>
                                        <div className='username'>
                                            <h3>{contact.username}</h3>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className='currentUser'>
                
                            <div className='avatar'>
                                <img src={`data:image/svg+xml;base64,${currentUserImage}`} alt="avatar" className='userAvatar'/>
                            </div>
                            <div className='username'>
                                <h3>{currentUserName}</h3>
                            </div>
        
                    </div>
                </div>
            )}
        </>
    )
}

export default Contacts