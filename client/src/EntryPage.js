import TextField from '@mui/material/TextField'
// import { styled } from '@mui/material/styles'
import Button from '@mui/material/Button'
// import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
// import Container from '@mui/material/Container'
import {useState} from 'react'
import Divider from '@mui/material/Divider'

function EntryPage(){
    
  const [newBonaFides, setNewBonaFides] = useState({})
  const handleNewBonaFides=(e)=>setNewBonaFides({...newBonaFides, [e.target.name]:e.target.value})
    
  const [returnBonaFides, setReturnBonaFides] = useState({})
  const handleReturnBonaFides=(e)=>setReturnBonaFides({...returnBonaFides, [e.target.name]:e.target.value})

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
      .then(d=>console.log(d))
      .then(setNewBonaFides({name:"", password:"", password_confirmation:""}))
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
      .then(d=>console.log(d))
      .then(setReturnBonaFides({name:"", password:""}))
  }

  function handleSignOut() {
    fetch("/backend/logout", {
      method: "DELETE",
    })
      .then((r) => r.json())
      .catch((err) => console.log(err))
      .then((data) => console.log(data))
  }

  // const Item = styled(Paper)(({ theme }) => ({
  //   ...theme.typography.body2,
  //   padding: theme.spacing(1),
  //   textAlign: 'center',
  //   color: theme.palette.text.secondary,
  // }));

    return(
        <>
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