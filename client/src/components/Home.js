import React, {useState, useEffect} from 'react'
import refimg from '../attachments/refimg.jpg'
import ServerBar from './ServerBar'
import FCBar from './FCBar'
import MainView from './MainView'
import NavView from './NavView'
import ActivityTab from './ActivityTab'
import DMs from './DMs'


const Home = ({user}) => {
  const [friends, setFriends] = useState([])
  const [dms, setDms] = useState(0)
  const [active, setActive] = useState({
    Online: true,
    All: false,
    Pending: false,
    Blocked: false,
    "Add Friend": false
  })

  useEffect(() => {
    if (user) {
      fetch(`http://localhost:3000/friends/${user.id}`, {
        method: "GET"
      })
      .then(r => r.json())
      .then(d => {
        setFriends(d)
      })
    }
  }, [user])

  return (
    <>
      <img src={refimg} alt="refimg" className='absolute opacity-100'/>
      <div className='Home absolute h-screen w-screen select-none'>
        
        <div className='server-bar h-screen bg-zinc-200 absolute'>
          <ServerBar setDms={setDms}/>
        </div>

        <div className="fc-bar absolute w-40 border-t-2">
          <FCBar friends={friends} user={user} setDms={setDms} />
        </div>

        <div className='main-view absolute bg-white border-t-2'>
          {dms ? <DMs dms={dms} user={user}/> : <MainView active={active} user={user} friends={friends} setFriends={setFriends}/>}
        </div>

        <div className='nav-view absolute bg-white top-0'>
          {!dms && <NavView active={active} setActive={setActive}/>}
        </div>

        <div className="activity-tab absolute bg-white border-l-2 border-t-2"></div>
      </div>
    </>
  )
}

export default Home