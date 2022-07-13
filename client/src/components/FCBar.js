import React from 'react'
import FCBarFriend from './FCBarFriend'
import UserSettings from './UserSettings'

const FCBar = ({friends, user, setDms}) => {

  return (
    <div className='FCBar'>
    <div className='fc-list'>
      {friends.map((e, i) => (
        <FCBarFriend key={i} e={e} setDms={setDms}/>
      ))}
    </div>
      <UserSettings user={user}/>
    </div>
  )
}

export default FCBar