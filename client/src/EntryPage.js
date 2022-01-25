import TextField from '@mui/material/TextField'
// import { styled } from '@mui/material/styles'
import Button from '@mui/material/Button'
import {useState} from 'react'
// import {useNavigate} from 'react-router-dom'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import TriviaCard from './TriviaCard'

function EntryPage({loggedIn, setLoggedIn}){
    
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
        if(d.error)
          {let newStr=(d.exception).slice(31,-1)
            alert(newStr)}
        else
          {setNewBonaFides({name:"", password:"", password_confirmation:""})
          setLoggedIn(true)}
            })
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
                if (d.error)
              {alert(d.error)}
                else
              {setReturnBonaFides({name:"", password:""})
              setLoggedIn(true)}
            })
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
        
  {loggedIn ? 
    <Button onClick={handleSignOut}>SIGN OUT</Button>
:
  <div>
    <Box sx={{
      padding: '20px 20px 20px 20px',
      position: 'relative',
      top: '12px',
      display: 'flex',
      alignItems: 'center',
      border: (theme) => `1px solid ${theme.palette.divider}`,
      bgcolor: 'background.paper',
      color: 'text.secondary'}}>

  <div style={{ textAlign: 'center', borderRadius: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
      <TextField style={{width:"100%"}} onChange={handleNewBonaFides} required value={newBonaFides.name} name="name" label="Username" />
      <TextField style={{width:"100%"}} onChange={handleNewBonaFides} required type="password" value={newBonaFides.password} name="password" label="Password"/>
      <TextField style={{width:"100%"}} onChange={handleNewBonaFides} required type="password" value={newBonaFides.password_confirmation} name="password_confirmation" label="Password Confirmation"/>
      <Button style={{fontFamily: 'Alice, serif'}} variant="contained" onClick={handleSignUp} > SIGN UP </Button>
    </div>
      <Divider style={{fontFamily: 'Alice, serif'}} orientation="vertical" flexItem variant="middle">
        OR
      </Divider>
      <div style={{ textAlign: 'center', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}} >
      <TextField style={{width:"100%"}} onChange={handleReturnBonaFides} required label="Username" name="name" value={returnBonaFides.name}/>
      <TextField style={{width:"100%"}} onChange={handleReturnBonaFides} required label="Password" name="password" type="password" value={returnBonaFides.password}/>
      <Button style={{fontFamily: 'Alice, serif'}} variant="contained" onClick={handleSignIn}>SIGN IN</Button>
      </div>
      </Box>
      </div>}
        
          </>
    )
}

export default EntryPage