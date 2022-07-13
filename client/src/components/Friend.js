import React from 'react'
import HarmonyIcon from '../attachments/HarmonyIcon.png'

const Friend = ({e, setFriends}) => {
  const {friend, id} = e
  const {username, pfp} = friend

  const handleRemoveFriend = () => {
    fetch(`http://localhost:3000/friends/${id}`, {
      method: 'DELETE'
    }).then(setFriends(v => v.filter(e => e.id !== id)))
  }

  return (
    <div className='Friend w-11/12 ml-6 relative text-gray-600 border-t-gray-300 hover:rounded-md hover:bg-gray-300 transition-colors duration-75'>
      <img className='friend-pfp inline-block rounded-full w-9 mt-3 ml-2' src={pfp || HarmonyIcon} alt="pfp" />
      <h3 className='friend-username inline-block ml-3 absolute top-3'>{username}</h3>

      <button className="remove-friend absolute right-2 top-1/2 -translate-y-1/2 bg-gray-200 p-1 px-3 rounded-md transition-all hover:bg-gray-100" onClick={handleRemoveFriend}>Remove Friend</button>
    </div>
  )
}

export default Friend