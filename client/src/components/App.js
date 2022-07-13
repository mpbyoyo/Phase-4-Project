import '../scss/App.scss';
import Login from './Login';
import Home from './Home';
import { useState, useEffect } from "react";

function App() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    fetch(`http://localhost:3000/me`).then(r => {
      if (r.ok) {
        r.json().then(d => setUser(d))
      }
    })
      
  }, [])
  
  return (
    <div className="App">
      {user ? <Home user={user} /> : <Login setUser={setUser} />}
    </div>
  );
}

export default App;
