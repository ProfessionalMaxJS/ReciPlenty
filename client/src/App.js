import './App.css'
import {useState} from 'react'
import NavBar from './NavBar';
import {Routes, Route, useNavigate} from 'react-router-dom'
import UserOriginal from "./UserOriginal"
import RecipeDisplayPage from './RecipeDisplayPage';
import Button from '@mui/material/Button'
import EntryPage from './EntryPage'
import {useEffect} from 'react'

function App() {

  const [loggedIn, setLoggedIn] = useState(false)
  useEffect(()=>{
    fetch("/backend/logged_in")
    .then(r=>r.json())
    .then(d=>{console.log(d)
              setLoggedIn(d.logged_in)})
  }, [])

  const toTheHouse = useNavigate()
  const handleSignIn = () =>{
    toTheHouse("/")
  }

  function handleSignOut() {
    fetch("/backend/logout", {
      method: "DELETE",
    })
      .then((r) => r.json())
      .catch((err) => console.log(err))
      .then((data) => {console.log(data)
                        setLoggedIn(false)})
  }

  return (
    <>
      <NavBar loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
<Routes>
  <Route path="/" element={<EntryPage loggedIn={loggedIn} setLoggedIn={setLoggedIn} />} />
  <Route path="/UserOriginal" element={<UserOriginal loggedIn={loggedIn} setLoggedIn={setLoggedIn} />} />
  <Route path="/RecipeDisplayPage/:id" element={<RecipeDisplayPage loggedIn={loggedIn} setLoggedIn={setLoggedIn} /> } />
  <Route path="/RecipeDisplayPage/:id/EditPage" element={<UserOriginal loggedIn={loggedIn} setLoggedIn={setLoggedIn} />} />
</Routes>

    {loggedIn ? <Button style={{ fontFamily: 'Alice, serif', position: "absolute", bottom: "12px", right: "50%", transform: "translate( 50%)"}} onClick={handleSignOut}>SIGN OUT</Button> : <Button style={{ fontFamily: 'Alice, serif', position: "absolute", bottom: "12px", right: "50%", transform: "translate( 50%)"}} onClick={handleSignIn}>Log In or Sign Up!</Button>}
    </>
 
 );
}

export default App;