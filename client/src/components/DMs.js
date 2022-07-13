import React, {useState, useEffect} from 'react'
import DM from './DM'

const DMs = ({dms, user}) => {
  const [messages, setMessages] = useState([])
  const [m, setM] = useState('')

  useEffect(() => {
    fetch(`http://localhost:3000/messages/${user.id}/${dms.id}`, {
      method: 'GET'
    })
    .then(r => r.json())
    .then(d => setMessages(d))
  }, [dms])

  const handleSubmit = (event) => {
    event.preventDefault()
    fetch(`http://localhost:3000/send`, {
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
    .then(d => setMessages(messages => [...messages, d]))
    setM('')
  }

  const renderedMessages = messages

  return (
    <div className='DMs'>
      {renderedMessages.map((message, i) => (
        <DM key={i} message={message} user={user} recipient={dms}/>
      ))}
      <form onSubmit={handleSubmit}>
        <input type="text" value={m} onChange={(e) => setM(e.target.value)} />
      </form>
    </div>
  )
}

export default DMs