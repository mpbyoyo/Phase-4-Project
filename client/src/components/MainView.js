import React, {useState, useEffect} from 'react'
import searchicon from '../attachments/searchicon.png'
import Friend from './Friend'
import PendingFriend from './PendingFriend'

const MainView = ({active, user, friends, setFriends}) => {
  const [search, setSearch] = useState("")
  const [pending, setPending] = useState([])

  useEffect(() => {
    if (active.Pending) {
      fetch('/pending')
        .then(r => r.json())
        .then(d => setPending(d))
    }
  }, [active])

  const handleSubmit = (e) => {
    e.preventDefault(e)
    if (active["Add Friend"]) {
      if (friends.filter(v => v.friend.username !== search).length === friends.length && search !== user.username) {
        fetch('/addfriend', {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            friend: search,
            user_id: user.id
          })
        })
        .then(r => {
          if (r.ok) {
            r.json().then(d => {
              setSearch('')
              setFriends(v => [...v, d])
            })
          } else {
            alert('User not found!')
          }
        })
        
      } else {
        // TEMPORARY
        alert('User already added')
      }
    }
  }

  const handleChange = (e) => {
    setSearch(e.target.value)
  }

  const renderedFriends = friends.sort((a, b) => a.friend.username.localeCompare(b.friend.username)).filter((e) => (
    e.friend.username.toLowerCase().includes(search.toLowerCase()) 
  ))

  const renderedPending = pending

  const handleFriendLabel = () => {
    const trueIndex = Object.values(active).indexOf(true)
    const trueKey = Object.keys(active)[trueIndex]
    if (active.Pending) return `${trueKey} - ${pending.length}`.toUpperCase()
    return `${trueKey} - ${friends.length}`.toUpperCase()
  }

  return (
    <div className='MainView overflow-scroll overflow-x-hidden'>
      {active["Add Friend"] && <label htmlFor="friend-search" className='absolute top-12 left-8 z-50 text-gray-600'>Add Friend:</label>}
      <form id="friend-search" onSubmit={handleSubmit}>
        <input type="text" placeholder='Search' className={`search-bar bg-gray-200 rounded-sm absolute ${active["Add Friend"] ? 'top-20' : 'top-16 '} left-8 p-1 pl-2 outline-none`} value={search} onChange={handleChange}/>
        <img src={searchicon} alt="searchicon" className='searchicon absolute w-5 right-7'/>
      </form>

      
      {!active["Add Friend"] && (
        <>
          <h1 className='online absolute top-28 left-6 text-gray-400 text-sm'>{handleFriendLabel()}</h1>
          <div className='friends-list absolute w-full mt-10 h-20'>
            {active.Pending ? (
              renderedPending.map((e, i) => (
                <PendingFriend key={i} pend={e} setPending={setPending} setFriends={setFriends}/>
              ))
              ) : (
              renderedFriends.map((e, i) => (
                <Friend key={i} e={e} setFriends={setFriends}/>
              ))
            )}
          </div>
        </>
      )}
      
    </div>
  )
}

export default MainView