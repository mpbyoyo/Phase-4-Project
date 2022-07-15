import React, {useState, useContext} from 'react'
import HarmonyIcon from '../attachments/HarmonyIcon.png'
import logouticon from '../attachments/logouticon.png'
import { UserContext } from './App'

const UserSettings = ({user}) => {
  const [pfpChange, setPfpChange] = useState(false)
  const [newPfp, setNewPfp] = useState('')
  const setUser = useContext(UserContext)

  const handleLogout = () => {
    fetch(`/logout`, {
        method: "DELETE"
      }).then(setUser(null))
  }

  const handleChangePfp = (e) => {
    setPfpChange(v => !v)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    fetch('/newpfp', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        pfp: newPfp
      })
    })
    .then(setUser(v => ({
      ...v,
      pfp: newPfp
    })))
  }

  return (
    <>
      <div className={`absolute bg-gray-50 bottom-20 w-full p-4 transition-all duration-200 ${!pfpChange ? 'opacity-0' : 'opacity-100'}`}>
        <label htmlFor='new-pfp-box' className='w-full text-xs text-gray-600'>Enter a url here!</label>
        <form onSubmit={handleSubmit}>
          <input id="new-pfp-box" type="text" className='w-full bg-gray-200 outline-none p-1 pl-2 text-sm' value={newPfp} onChange={(e) => setNewPfp(e.target.value)}/>
        </form>
      </div>

      <div className='user-settigns absolute w-full h-20 bg-gray-200 bottom-0'>
        <img src={user.pfp || HarmonyIcon} alt="pfp" className='pfp w-12 inline-block mt-3 ml-3 cursor-pointer' onClick={handleChangePfp}/>
        <h1 className='username-settings inline-block absolute top-4 left-16 text-gray-600'>{user.username}</h1>

        <img src={logouticon} alt="" className='cursor-pointer absolute right-1 top-1/2 -translate-y-1/2 w-8' onClick={handleLogout}/>
      </div>
    </>
  )
}

export default UserSettings