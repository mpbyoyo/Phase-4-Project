import React, {useState} from 'react'
import HarmonyIcon from '../attachments/HarmonyIcon.png'

const FCBarFriend = ({e, setDms, dmHighlight, setDmHighlight}) => {
  const {friend, user} = e
  const {id, username, pfp} = friend
  

  const handleClick = () => {
    setDms(friend)
    setDmHighlight({[id]: true})
  }

  return (
    <div className={`${dmHighlight[id] && 'bg-gray-200'} FCBarFriend w-11/12 left-1/2 -translate-x-1/2 mb-1 rounded-lg transition-all duration-75 cursor-pointer relative top-56 hover:bg-gray-300 p-2`} onClick={handleClick}>
      <img src={pfp || HarmonyIcon} alt="pfp" className='pfp w-9 inline-block' />
      <h3 className='inline-block ml-2 text-gray-700'>{username}</h3>
    </div>
  )
}

export default FCBarFriend