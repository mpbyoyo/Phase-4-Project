import React, {useEffect} from 'react'
import friendicon from '../attachments/friendicon.png'

const NavView = ({active, setActive, dms}) => {
  const handleClick = (e) => {
    let preActive = {
      Online: false,
      All: false,
      Pending: false,
      Blocked: false,
      "Add Friend": false
    }

    preActive[e.target.textContent] = true
    setActive(preActive)
  }

  // useEffect(() => {

  // }, [])

  const navTabs = 'nav-tabs inline-block text-center rounded-md hover:bg-gray-200 active:bg-gray-300 cursor-pointer transition-all duration-75 text-gray-600 ml-4'

  return (
    <div className='NavView'>
      <img className='friendicon w-8 inline-block' src={friendicon} alt="" />
      <h2 className='inline-block w-20 border-r-2'>Friends</h2>
      <h3 className={`${navTabs} w-16 ${active.Online && 'bg-gray-300'}`} onClick={handleClick}>Online</h3>
      <h3 className={`${navTabs} w-9 ${active.All && 'bg-gray-300'}`} onClick={handleClick}>All</h3>
      <h3 className={`${navTabs} w-20 ${active.Pending && 'bg-gray-300'}`} onClick={handleClick}>Pending</h3>
      <h3 className={`${navTabs} w-20 ${active.Blocked && 'bg-gray-300'}`} onClick={handleClick}>Blocked</h3>
      <h3 className='inline-block ml-5 text-white bg-green-600 cursor-pointer rounded-md w-24 text-center' onClick={handleClick}>Add Friend</h3>
    </div>
  )
}

export default NavView