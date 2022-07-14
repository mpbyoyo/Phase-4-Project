import React from 'react'
import HarmonyFullIcon from '../attachments/HarmonyFullIcon.jpg'

const ServerBar = ({setDms}) => {
  return (
    <div className='server-bar'>
      <div className='p-3 cursor-pointer' onClick={() => setDms(0)}>
        <img src={HarmonyFullIcon} alt="Home button" className='home-button w-12 border-b-2 transition-all duration-300'/>
      </div>
    </div>
  )
}

export default ServerBar