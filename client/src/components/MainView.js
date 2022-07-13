import React, {useState} from 'react'
import searchicon from '../attachments/searchicon.png'
import Friend from './Friend'

const MainView = ({active, user, friends, setFriends}) => {
  const [search, setSearch] = useState("")

  // console.log(friends)

  const handleSubmit = (e) => {
    e.preventDefault(e)
    if (active["Add Friend"]) {
      if (friends.filter(v => v.friend.username !== search).length === friends.length && search !== user.username) {
        fetch('http://localhost:3000/addfriend', {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            friend: search,
            user_id: user.id
          })
        })
        .then(r => r.json())
        .then(d => {
          setSearch('')
          setFriends(v => [...v, d])
        })
      } else {
        // TEMPORARY
        alert('User not found')
      }
    }
  }

  const handleChange = (e) => {
    setSearch(e.target.value)
  }

  const renderedFriends = friends.filter((e) => (
    e.friend.username.toLowerCase().includes(search.toLowerCase()) 
  ))

  return (
    <div className='MainView overflow-scroll overflow-x-hidden'>
      {active["Add Friend"] && <label htmlFor="friend-search" className='absolute top-4 left-8 z-50 text-gray-600'>Add Friend:</label>}
      <form id="friend-search" onSubmit={handleSubmit}>
        <input type="text" placeholder='Search' className={`search-bar bg-gray-200 rounded-sm absolute ${active["Add Friend"] ? 'top-10' : 'top-4 '} left-8 p-1 pl-2 outline-none`} value={search} onChange={handleChange}/>
        <img src={searchicon} alt="searchicon" className='absolute w-5 right-7 top-5'/>
      </form>

      
      {!active["Add Friend"] && (
        <>
          <h1 className='online absolute top-20 left-6 text-gray-400 text-sm'>ONLINE - {friends.length}</h1>
          <div className='friends-list absolute w-full h-20'>
            {renderedFriends.map((e, i) => (
              <Friend key={i} e={e} setFriends={setFriends}/>
            ))}
          </div>
        </>
      )}
      
    </div>
  )
}

export default MainView