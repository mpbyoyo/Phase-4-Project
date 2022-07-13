import React, {useState} from 'react'
import HarmonyIcon from '../attachments/HarmonyIcon.png'

const FCBarFriend = ({e, setDms}) => {
  const {friend, user} = e
  const {id, username, pfp} = friend
  

  const handleClick = () => {
    setDms(friend)
  }

  return (
    <div className='FCBarFriend w-full mb-3 cursor-pointer' onClick={handleClick}>
      <img src={pfp || HarmonyIcon} alt="pfp" className='w-9 inline-block' />
      <h3 className='inline-block ml-2'>{username}</h3>


    </div>
  )
}

export default FCBarFriend