import '@progress/kendo-theme-default/dist/all.css';  
import './App.css'
import {useNavigate} from 'react-router-dom'
import {useState} from 'react'
import NavBar from './NavBar';
import TriviaCard from "./TriviaCard"
import {Routes, Route} from 'react-router-dom'
import UserOriginal from "./UserOriginal"
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
</Routes>
    </>
 
 );
}

export default App;
