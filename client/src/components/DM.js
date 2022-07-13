import React, {useState, useEffect} from 'react'
import HarmonyIcon from '../attachments/HarmonyIcon.png'

const DM = ({message, user, recipient}) => {
  const [pfData, setPfData] = useState({})
  
  useEffect(() => {
    setPfData({
      [user.id]: user,
      [recipient.id]: recipient
    })
  }, [recipient])

  return (
    <div className='DM'>
      <img src={pfData[message.user_id] && (pfData[message.user_id].pfp || HarmonyIcon)} alt="" className='w-10 inline-block'/>
      <p className='inline-block'>{`${pfData[message.user_id] && pfData[message.user_id].username} ${message.text}`}</p>
    </div>
  )
}

export default DM