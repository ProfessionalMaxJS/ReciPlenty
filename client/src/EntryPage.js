import TextField from '@mui/material/TextField'
// import { styled } from '@mui/material/styles'
import Button from '@mui/material/Button'
import {useState, useEffect} from 'react'
// import {useNavigate} from 'react-router-dom'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'

function EntryPage({loggedIn, setLoggedIn}){

  useEffect(()=>{
    fetch("https://foodish-api.herokuapp.com/api")
    .then(r=>r.json())
    .then(d=>setImg1Url(d.image))
    
    fetch("https://foodish-api.herokuapp.com/api")
    .then(r=>r.json())
    .then(d=>setImg2Url(d.image))

    fetch("https://foodish-api.herokuapp.com/api")
    .then(r=>r.json())
    .then(d=>setImg3Url(d.image))
  },[])
    
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
  const [img1Url, setImg1Url] = useState("")
  const [trivia, setTrivia] = useState("")
  const handleTrivia = () =>{
      fetch("https://api.spoonacular.com/food/trivia/random?apiKey=b5e32d122c6b42b69718e6565a960525")
      .then(r=>r.json())
      .catch(err=>alert(err))
      .then(d=>setTrivia(d.text))
                // toTheCards("/")})

    fetch("https://foodish-api.herokuapp.com/api")
    .then(r=>r.json())
    .then(d=>setImg1Url(d.image))
  }

  const [img2Url, setImg2Url] = useState("")
  const [blog, setBlog] = useState("")
  const [source, setSource] = useState("")
  const handleBlog = () =>{
  fetch("https://api.spoonacular.com/recipes/random?number=1&tags=lunch&apiKey=b5e32d122c6b42b69718e6565a960525")
  .then(r=>r.json())
  .then(d=>{console.log(d)
            setBlog(d.recipes[0].creditsText)
            let setup=d.recipes[0].sourceUrl.split(".com")
            setSource(setup[0])
  })

  fetch("https://foodish-api.herokuapp.com/api")
  .then(r=>r.json())
  .then(d=>setImg2Url(d.image))}

  const [img3Url, setImg3Url] = useState("")
  const [pair, setPair] = useState("")
  const handlePairing = () =>{
  fetch("https://api.punkapi.com/v2/beers/random")
  .then(r=>r.json())
  .then(d=>{console.log(d)
        console.log(d[0].tagline)
        let beerStr = d[0].tagline.toString().slice(0,-1)
        let newStr = `Try ${beerStr} with `
        d[0].food_pairing.map(fp=>newStr+=`${fp}, `)
        let newNewStr = `${newStr.slice(0,-2)}...`
        setPair(newNewStr)})

  fetch("https://foodish-api.herokuapp.com/api")
  .then(r=>r.json())
  .then(d=>setImg3Url(d.image))}
  
    return(
        <>

  {!loggedIn &&   
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
      <TextField style={{margin: '3px 0px 3px 0px', width:"100%"}} onChange={handleNewBonaFides} required value={newBonaFides.name} name="name" label="Username" />
      <TextField style={{margin: '3px 0px 3px 0px', width:"100%"}} onChange={handleNewBonaFides} required type="password" value={newBonaFides.password} name="password" label="Password"/>
      <TextField style={{margin: '3px 0px 3px 0px', width:"100%"}} onChange={handleNewBonaFides} required type="password" value={newBonaFides.password_confirmation} name="password_confirmation" label="Password Confirmation"/>
      <Button style={{margin: '3px 0px 3px 0px', fontFamily: 'Alice, serif'}} variant="contained" onClick={handleSignUp} > SIGN UP </Button>
    </div>
      <Divider style={{fontFamily: 'Alice, serif'}} orientation="vertical" flexItem variant="middle">
        OR
      </Divider>
      <div style={{ textAlign: 'center', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}} >
      <TextField style={{margin: '3px 0px 3px 0px', width:"100%"}} onChange={handleReturnBonaFides} required label="Username" name="name" value={returnBonaFides.name}/>
      <TextField style={{margin: '3px 0px 3px 0px', width:"100%"}} onChange={handleReturnBonaFides} required label="Password" name="password" type="password" value={returnBonaFides.password}/>
      <Button style={{margin: '3px 0px 3px 0px', fontFamily: 'Alice, serif'}} variant="contained" onClick={handleSignIn}>SIGN IN</Button>
      </div>
      </Box>
      </div>}

    <div style={{textAlign: 'center', fontFamily: 'Alice, serif'}} >
    <h1 >Welcome to ReciPlenty, a place for all the best food ideas to mingle...</h1>
    <p >Here, you can note down your best new ideas, or look up recipes for foods you've always wanted to try. But while you're, here, you can also:</p>
    </div>
<div style={{height: "600px", display:'flex', flexDirection: 'row', alignItems: 'flex-start'}} >
  <Card sx={{ maxWidth: 250, textAlign: "center" }}>
    <CardMedia component="img" height="150" image={img1Url} alt={img1Url} />
    <Typography style={{fontFamily: 'Alice, serif'}}>{trivia}</Typography>
    <Button onClick={handleTrivia}>Click Here to Learn a Random Food Fact</Button>
  </Card>
  <Card sx={{ alignSelf: 'center', maxWidth: 250, textAlign: "center" }}>
    <CardMedia component="img" height="150" image={img2Url} alt={img2Url} />
    <a href={`${source}.com`} style={{fontFamily: 'Alice, serif'}}>{blog}</a>
    <Button onClick={handleBlog}>Click Here for a Link to a Random Food Blog</Button>
  </Card>
  <Card sx={{ maxWidth: 250, textAlign: "center" }}>
    <CardMedia component="img" height="150" image={img3Url} alt={img3Url} />
    <Typography style={{fontFamily: 'Alice, serif'}}>{pair}</Typography>
    <Button onClick={handlePairing}>Click Here for a Random Beer-Food Pairing</Button>
  </Card>
</div>

<p>Photos powered by <a href="www.foodish-api.herokuapp.com" style={{fontFamily: 'Alice, serif'}} > Foodish</a></p>

  </>  
  )
}

export default EntryPage