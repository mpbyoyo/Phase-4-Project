import React, {useState, useEffect, createContext} from 'react'
import refimg from '../attachments/refimg.jpg'
import ServerBar from './ServerBar'
import FCBar from './FCBar'
import MainView from './MainView'
import NavView from './NavView'
import ActivityTab from './ActivityTab'
import DMs from './DMs'

export const messageContext = createContext()

const Home = ({user}) => {
  const [friends, setFriends] = useState([])
  const [dms, setDms] = useState(0)
  const [messages, setMessages] = useState([])
  const [active, setActive] = useState({
    Online: true,
    All: false,
    Pending: false,
    Blocked: false,
    "Add Friend": false
  })

  useEffect(() => {
    if (user) {
      fetch(`/friends/${user.id}`, {
        method: "GET"
      })
      .then(r => r.json())
      .then(d => {
        setFriends(d)
      })
    }
  }, [user])

  useEffect(() => {
    const interval = setInterval(() => {
      if (user) {
        fetch(`/friends/${user.id}`, {
          method: "GET"
        })
        .then(r => r.json())
        .then(d => {
          setFriends(d)
        })
      }
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (dms) {
      fetch(`/messages/${dms.id}`, {
        method: 'GET'
      })
      .then(r => r.json())
      .then(d => setMessages(d))
    }
  }, [dms]);

  return (
    <>
    <messageContext.Provider value={{messages, setMessages}}>
      <div className='Home absolute h-screen w-screen select-none'>
        
        <div className='server-bar h-screen bg-zinc-200 absolute'>
          <ServerBar setDms={setDms}/>
        </div>

        <div className="fc-bar absolute w-40 border-t-2">
          <FCBar friends={friends} user={user} setDms={setDms} />
        </div>

        <div className='main-view absolute bg-white border-t-2'>
          {dms ? <DMs dms={dms} setFriends={setFriends} user={user}/> : <MainView active={active} user={user} friends={friends} setFriends={setFriends}/>}
        </div>

        <div className='nav-view absolute bg-white top-0'>
          {!dms && <NavView active={active} setActive={setActive} friend={friends.map(e => e.friend).filter(e => e.id === dms.id)[0]}/>}
        </div>
      </div>
    </messageContext.Provider>
    </>
  )
}

export default Home