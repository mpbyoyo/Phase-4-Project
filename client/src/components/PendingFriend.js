import React from 'react'
import HarmonyIcon from '../attachments/HarmonyIcon.png'

const PendingFriend = ({pend, setPending, setFriends}) => {
  const {user, id} = pend
  const {pfp, username} = user

  const handlePend = (e) => {
    if (e.target.name === "accept") {
      fetch('/acceptfriend', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          friend: user.id,
        })
      })
      .then(r => {
        r.json().then(d => {
          setFriends(v => [...v, d])
          setPending(v => v.filter(e => e.id !== id))
        })
      })
    } else {
      fetch(`/friends/${id}`, {
        method: 'DELETE'
      }).then(setPending(v => v.filter(e => e.id !== id)))
    }
  }

  return (
    <div className='pending-friend'>
      <div className='Friend w-11/12 ml-6 relative text-gray-600 border-t-gray-300 hover:rounded-md hover:bg-gray-300 transition-colors duration-75'>
      <img className='friend-pfp pfp inline-block rounded-full w-9 mt-3 ml-2' src={pfp || HarmonyIcon} alt="pfp" />
      <h3 className='friend-username inline-block ml-3 absolute top-3'>{username}</h3>

      <button name="accept" className="remove-friend absolute right-12 top-1/2 -translate-y-1/2 bg-gray-200 w-6 rounded-full transition-all hover:bg-gray-100" onClick={handlePend}>✓</button>
      <button name="decline" className="remove-friend absolute right-2 top-1/2 -translate-y-1/2 bg-gray-200 w-6 rounded-full transition-all hover:bg-gray-100" onClick={handlePend}>✖</button>
    </div>
    </div>
  )
}

export default PendingFriend