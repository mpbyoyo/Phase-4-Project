import '../scss/App.scss';
import Login from './Login';
import Home from './Home';
import { useState, useEffect, createContext } from "react";

const UserContext = createContext(null)
export { UserContext }

function App() {
  const [user, setUser] = useState(null)
  

  useEffect(() => {
    fetch(`/me`).then(r => {
      if (r.ok) {
        r.json().then(d => setUser(d))
      }
    })
      
  }, [])
  
  return (
    <UserContext.Provider value={setUser}>
      <div className="App">
        {user ? <Home user={user}/> : <Login setUser={setUser} />}
      </div>
    </UserContext.Provider>
  );
}

export default App;
