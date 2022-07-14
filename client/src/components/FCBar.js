import React, {useState} from 'react'
import FCBarFriend from './FCBarFriend'
import UserSettings from './UserSettings'
import skkolqw9 from '../attachments/skkolqw9.bmp'

const FCBar = ({friends, user, setDms}) => {
  const [dmHighlight, setDmHighlight] = useState({})

  const fcBarFriends = friends.sort((a, b) => b.last_message - a.last_message)

  return (
    <>
      <div className='FCBar'>
        <img src={skkolqw9} alt="harmony" className='absolute left-1/2 -translate-x-1/2 pointer-events-none'/>
        <label htmlFor="fc-list" className='fc-list-label absolute top-48 border-b-2 pt-3 pl-2 left-1/2 -translate-x-1/2 w-11/12 text-gray-500 text-xs'>DIRECT MESSAGES</label>
        <div className='fc-list' id='fc-list'>
          {fcBarFriends.map((e, i) => (
            <FCBarFriend key={i} e={e} setDms={setDms} dmHighlight={dmHighlight} setDmHighlight={setDmHighlight}/>
          ))}
        </div>
        
      </div>
      <UserSettings user={user}/>
    </>
  )
}

export default FCBar