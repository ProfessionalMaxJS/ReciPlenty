import {useState, useEffect} from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import '../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch'

function UserOriginal({loggedIn, setLoggedIn}){

  // const elloGuvnah = () => {console.log("elloGuvnah!")}
  
  const [recipe, setRecipe] = useState({})
  const [pic, setPic] = useState(null)
  const [picPreview, setPicPreview] = useState("")
  const id = useParams().id
  
  // useEffect(()=>{
  //   fetch("/backend/logged_in")
  //   .then(r=>r.json())
  //   .then(d=>{console.log(d)
  //     setLoggedIn(d.logged_in)})
  //   }, [setLoggedIn])
    
  const toTheHouse = useNavigate()
  const toTheDisplay = useNavigate()
 
  if(loggedIn===false && id)
    {toTheHouse("/")
    alert("Sorry, you must be logged in to use this feature")}

  
  // console.log(id)
  const [checked, setChecked] = useState(false)
  
  useEffect(()=>{
    if(id){
      // console.log("elloGuvnah!")
      fetch(`/backend/saved_recipes/${id}`)
          .then(r=>r.json())
          .then(d=>{//console.log(d) 
                    setRecipe(d)
                    setPicPreview(d.food_pic.url)
                    setChecked(d.cooked_by_user)})}
  }, [id])

  const handleRecipeWrite = (e) =>{
    setRecipe({...recipe, [e.target.name]:e.target.value})
      // console.log(recipe)
    }
    const handleSwitch = (e) => {
      setChecked(!checked)
      // console.log(!checked)
      setRecipe({...recipe, cooked_by_user: !checked})
    }
    
    const handleRecipeSubmit=()=>{
      if(loggedIn) 
     {const formy = new FormData()
      formy.append('pic', pic)
      formy.append('title', recipe.title)
      formy.append('ingredients', recipe.ingredients)
      formy.append('instructions', recipe.instructions)
      formy.append('cooked_by_user', checked)

    fetch('/backend/add_user_recipe', {
      method: "POST",
      body: formy
          })
      .then((r) => r.json())
      .catch(err=>console.log(err))
     .then(d => {console.log(d)  
            if(d.error)
            {let newStr=((d.exception).slice(50,-1))
            alert(newStr)}
            else
            {
            setRecipe({title: "", ingredients: "", equipment: "", instructions: ""})
            setChecked(false)
            toTheDisplay(`/RecipeDisplayPage/${d.id}`)
           }
          }) }
          else
            {alert("Sorry, you need to be logged in to use that feature.")}
          }
      
                
  const handleRecipePatch = () =>{
    // console.log(recipe)

    const editedFormy = new FormData()
    editedFormy.append('pic', pic)
    editedFormy.append('title', recipe.title)
    editedFormy.append('ingredients', recipe.ingredients)
    editedFormy.append('instructions', recipe.instructions)
    editedFormy.append('cooked_by_user', checked)

  fetch('/backend/add_user_recipe', {
    method: "POST",
    body: editedFormy
        })
    .then((r) => r.json())
    .catch(err=>console.log(err))
   .then(d => {console.log(d)  
          if(d.error)
          {let newStr=((d.exception).slice(50,-1))
          alert(newStr)}
          else
          {
          setRecipe({title: "", ingredients: "", equipment: "", instructions: ""})
          setChecked(false)
          toTheDisplay(`/RecipeDisplayPage/${d.id}`)
    }
  })}
    // const home = useNavigate()
    const handleRecipeDelete = () =>{
      fetch(`/backend/saved_recipes/${id}`, {
        method: "DELETE"
      })
      .then(r=>r.json())
      .then(d=>console.log(d))
      toTheHouse("/")
    }
    
    const handlePicAdd=(e)=>{
      setPic(e.target.files[0])

      // const smallFormy = new FormData()
      // smallFormy.append('pic', pic)
    }
    
    return(
      <>
        <Box style={{textAlign: "center", justifyContent: 'center'}} /*sx={{'& .MuiTextField-root': {  m: 1 },}}*/>
        <h1 style={{fontFamily: 'Alice, serif'}}>Add Your Recipe</h1>
        <TextField variant="filled" multiline style={{borderRadius: "10px", width: "90%", border: '1px solid black'}} value={recipe.title} label="Title" required name="title" onChange={handleRecipeWrite}/>
        <TextField variant="filled" multiline style={{marginTop: "12px", borderRadius: "10px", width: "90%", border: '1px solid black'}} value={recipe.ingredients} label="Ingredients" name="ingredients" onChange={handleRecipeWrite}/>
        <TextField variant="filled" multiline style={{marginTop: "12px", borderRadius: "10px", width: "90%", border: '1px solid black'}} value={recipe.instructions} label="Instructions" name="instructions" onChange={handleRecipeWrite}/>

        <FormControlLabel control={<Switch checked={checked} onChange={handleSwitch}/>} label="Have you made this recipe before?" />
        {/* <Switch onChange={handleSwitch} checked={checked}/> */}
        
        <form>
          {id ? <p /*style={{ fontFamily: ''}}*/ >Would you like to change the photo?</p> : <p>Would you like to add a photo?</p> }
        <input type="file" multiple={false} accept="image/*" onChange={handlePicAdd} />
        {id && <img style={{maxHeight:'150px'}} src={picPreview} alt={picPreview} />}
        </form>
        {id ? <div> <Button style={{marginTop: "12px", fontFamily: 'Alice, serif'}} variant="contained" onClick={handleRecipePatch}>SAVE CHANGES</Button> <Button style={{marginTop: "12px", fontFamily: 'Alice, serif'}} variant="contained" onClick={handleRecipeDelete}>REMOVE FROM MY LIST</Button> </div>
        : <div><Button style={{marginTop: "12px", fontFamily: 'Alice, serif'}} onClick={handleRecipeSubmit} variant="contained">CREATE</Button></div>}
        </Box>
        </>
    )
}

export default UserOriginal;