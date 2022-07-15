import React, {useState, useEffect, useContext} from 'react'
import DM from './DM'
import HarmonyIcon from '../attachments/HarmonyIcon.png'
import { messageContext } from './Home'

const DMs = ({dms, user, setFriends}) => {
  const {messages, setMessages} = useContext(messageContext)
  const [m, setM] = useState('')

  useEffect(() => {
    const interval = setInterval(() => {
      fetch(`/messages/${dms.id}`, {
        method: 'GET'
      })
      .then(r => r.json())
      .then(d => setMessages(v => d))
    }, 100);
    return () => clearInterval(interval);
  }, [dms]);

  useEffect(() => {
    fetch(`/friends/${user.id}`)
      .then(r => r.json())
      .then(d => setFriends(d))
  }, [messages])

  const handleSubmit = (event) => {
    event.preventDefault()
    fetch(`/send`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        text: m,
        user_id: user.id,
        recipient_id: dms.id
      })
    })
    .then(r => r.json())
    .then(d => setMessages(messages => [d, ...messages]))
    setM('')
  }

  const renderedMessages = messages

  return (
    <div className='DMs mt-5 w-full'>
      <div className='h-6'></div>
      <div className='dm-container overflow-auto w-full'>
        
        {renderedMessages.map((message, i) => (
          <DM key={i} message={message} user={user} recipient={dms}/>
        ))}
        <div className='mb-5 ml-5'>
          <img src={dms.pfp || HarmonyIcon} alt="pfp" className='w-36 rounded-full' />
          <h1 className='text-6xl text-gray-900'>{dms.username}</h1>
          <h2 className='text-gray-600'>This is the beginning of your message history with <strong>@{dms.username}.</strong></h2>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="absolute left-1/2 -translate-x-1/2 bottom-20 w-11/12">
        <input type="text" placeholer={`message @${dms.id}`} value={m} onChange={(e) => setM(e.target.value)} className='absolute bg-gray-200 outline-none rounded-md p-2 w-full left-1/2 -translate-x-1/2'/>
      </form>
    </div>
  )
}

export default DMs