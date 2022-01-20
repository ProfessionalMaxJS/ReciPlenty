import './App.css'
import {useState} from 'react'
import NavBar from './NavBar';
import TriviaCard from "./TriviaCard"
import {Routes, Route, useNavigate, Link} from 'react-router-dom'
import UserOriginal from "./UserOriginal"
import RecipeDisplayPage from './RecipeDisplayPage';
import EntryPage from './EntryPage'
// import EditPage from './EditPage'

function App() {

  const toTheCards = useNavigate()
  const [trivia, setTrivia] = useState("")
  const handleTrivia = () =>{
      fetch("https://api.spoonacular.com/food/trivia/random?apiKey=b5e32d122c6b42b69718e6565a960525")
      .then(r=>r.json())
      .catch(err=>alert(err))
      .then(d=>{setTrivia(d.text)
                toTheCards("/")})
  }

  return (
    <>
      <NavBar handleTrivia={handleTrivia} />
<Routes>
  <Route path="/" element={<TriviaCard trivia={trivia}/>} />
  <Route path="/UserOriginal" element={<UserOriginal />} />
  <Route path="/RecipeDisplayPage/:id" element={<RecipeDisplayPage /> } />
  <Route path="/RecipeDisplayPage/:id/EditPage" element={<UserOriginal />} />
  <Route path="/EntryPage" element={<EntryPage />} />
  {/* <Route path="/EditPage" element={<EditPage />} /> */}
</Routes>
    <Link style={{position: "absolute", bottom: "12px", right: "50%", transform: "translate( 50%)"}} to="EntryPage">Log In or Sign Up!</Link>
    </>
 
 );
}

export default App;