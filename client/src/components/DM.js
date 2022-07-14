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
    <div className='DM ml-4 mb-3 hover:bg-gray-100 p-1 rounded-sm mt-1'>
      <img src={pfData[message.user_id] && (pfData[message.user_id].pfp || HarmonyIcon)} alt="" className='relative top-3 pfp w-10 inline-block'/>
      <p className='inline-block ml-2 dm-username text-gray-900'>{`${pfData[message.user_id] && pfData[message.user_id].username}`}</p>
      <p className='relative left-12 w-10/12 bottom-2 text-gray-600 dm-message'>{`${message.text}`}</p>
    </div>
  )
}

export default DM