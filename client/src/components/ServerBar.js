import React from 'react'
import HarmonyIcon from '../attachments/HarmonyIcon.png'

const ServerBar = ({setDms}) => {
  return (
    <div className='ServerBar'>
      <div className='p-3 cursor-pointer' onClick={() => setDms(0)}>
        <img src={HarmonyIcon} alt="Home button" className='home-button w-10 border-b-2'/>
      </div>
    </div>
  )
}

export default ServerBar