import './App.css'
import {useState} from 'react'
import NavBar from './NavBar';
import {Routes, Route, useNavigate, Link} from 'react-router-dom'
import UserOriginal from "./UserOriginal"
import RecipeDisplayPage from './RecipeDisplayPage';
import EntryPage from './EntryPage'
import {useEffect} from 'react'

function App() {

  const [loggedIn, setLoggedIn] = useState(false)
  useEffect(()=>{
    fetch("/backend/logged_in")
    .then(r=>r.json())
    .then(d=>setLoggedIn(d.logged_in))
  }, [])

  return (
    <>
      <NavBar loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
<Routes>
  <Route path="/" element={<EntryPage loggedIn={loggedIn} setLoggedIn={setLoggedIn} />} />
  <Route path="/UserOriginal" element={<UserOriginal loggedIn={loggedIn} setLoggedIn={setLoggedIn} />} />
  <Route path="/RecipeDisplayPage/:id" element={<RecipeDisplayPage loggedIn={loggedIn} setLoggedIn={setLoggedIn} /> } />
  <Route path="/RecipeDisplayPage/:id/EditPage" element={<UserOriginal loggedIn={loggedIn} setLoggedIn={setLoggedIn} />} />
</Routes>
    <Link style={{position: "absolute", bottom: "12px", right: "50%", transform: "translate( 50%)"}} to="/">Log In or Sign Up!</Link>
    </>
 
 );
}

export default App;