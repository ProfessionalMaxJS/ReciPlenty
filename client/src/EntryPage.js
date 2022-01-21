import TextField from '@mui/material/TextField'
// import { styled } from '@mui/material/styles'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import {useState} from 'react'
// import {useNavigate} from 'react-router-dom'
import Divider from '@mui/material/Divider'
import TriviaCard from './TriviaCard'

function EntryPage({setLoggedIn}){
    
  const [newBonaFides, setNewBonaFides] = useState({})
  const handleNewBonaFides=(e)=>setNewBonaFides({...newBonaFides, [e.target.name]:e.target.value})
    
  const [returnBonaFides, setReturnBonaFides] = useState({})
  const handleReturnBonaFides=(e)=>setReturnBonaFides({...returnBonaFides, [e.target.name]:e.target.value})

  // const toTheHouse = useNavigate()
  const handleSignUp=()=>{
    console.log(newBonaFides)
    fetch("/backend/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newBonaFides),
    })
      .then((r) => r.json())
      .then(d=>{console.log(d)
      setNewBonaFides({name:"", password:"", password_confirmation:""})
             setLoggedIn(true)})
      // .then(toTheHouse("/"))
  }

 
  function handleSignIn() {
    fetch("/backend/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(returnBonaFides),
    })
      .then((r) => r.json())
      .then(d=>{console.log(d)
            setReturnBonaFides({name:"", password:""})
             setLoggedIn(true)})
      // .then(toTheHouse("/"))
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

  // const Item = styled(Paper)(({ theme }) => ({
  //   ...theme.typography.body2,
  //   padding: theme.spacing(1),
  //   textAlign: 'center',
  //   color: theme.palette.text.secondary,
  // }));

  // const toTheCards = useNavigate()
  const [trivia, setTrivia] = useState("")
  const handleTrivia = () =>{
      fetch("https://api.spoonacular.com/food/trivia/random?apiKey=b5e32d122c6b42b69718e6565a960525")
      .then(r=>r.json())
      .catch(err=>alert(err))
      .then(d=>setTrivia(d.text))}
                // toTheCards("/")})

    return(
        <>
        <Button onClick={handleTrivia}>TRIVIA</Button>
        <TriviaCard trivia={trivia} />
    <div
      component="form"
      // sx={{
      //   '& .MuiTextField-root': { m: 1, width: '25ch' },
      // }}
      // noValidate
      // autoComplete="off"
    >
          <Stack>
        <TextField onChange={handleNewBonaFides} value={newBonaFides.name} name="name" />
        <TextField onChange={handleNewBonaFides} type="password" value={newBonaFides.password} name="password"/>
        <TextField onChange={handleNewBonaFides} type="password" value={newBonaFides.password_confirmation} name="password_confirmation"/>
        <Button onClick={handleSignUp} > SIGN UP </Button>
        </Stack>
        <Divider orientation="vertical" />
        {/* OR
      </Divider> */}
         <Stack>
        <TextField onChange={handleReturnBonaFides} name="name" value={returnBonaFides.name}/>
        <TextField onChange={handleReturnBonaFides} name="password" type="password" value={returnBonaFides.password}/>
        <Button onClick={handleSignIn}>SIGN IN</Button>
        </Stack>
        <Button onClick={handleSignOut}>SIGN OUT</Button>
        </div>
        </>
    )
}

export default EntryPage