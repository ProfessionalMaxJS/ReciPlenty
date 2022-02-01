import {useState, useEffect} from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import '../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Switch from '@mui/material/Switch'

function UserOriginal({loggedIn}){

  // const elloGuvnah = () => {console.log("elloGuvnah!")}
  
  const [recipe, setRecipe] = useState({title:"", ingredients:"", instructions:"", cooked_by_user: false})
  const [pic, setPic] = useState(null)
  const [picPreview, setPicPreview] = useState("")
  const id = useParams().id
  const [checked, setChecked] = useState(false)
  const toTheHouse = useNavigate()
  const toTheDisplay = useNavigate()
    
  // console.log(id)

useEffect(()=>{
  if(id)
{  fetch("/backend/logged_in")
    .then(r=>r.json())
    .catch(err=>alert(err))
    .then(d=>{//console.log(d)
          if(d.logged_in===false)
    {alert("Sorry, this Page is Only for Saved Recipes (a Feature only Available to Members Whov've Signed Up or Logged In)")
      toTheHouse("/")}})}}, [])

  useEffect(()=>{
    if(id){
      // console.log("elloGuvnah!")
      fetch(`/backend/saved_recipes/${id}`)
      .then(r=>r.json())
      .catch(err=>alert(err))
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
      
  if(loggedIn===false)
    {return alert("Sorry, you need to be logged in to use that feature.")}
    
    const formy = new FormData()
    pic &&  formy.append('pic', pic)
    recipe.title &&  formy.append('title', recipe.title)
    recipe.ingredients && formy.append('ingredients', recipe.ingredients)
    recipe.instructions &&  formy.append('instructions', recipe.instructions)
    formy.append('cooked_by_user', recipe.cooked_by_user)

    fetch('/backend/add_user_recipe', {
      method: "POST",
      body: formy
          })
      .then((r) => r.json())
      .catch(err=>alert(err))
     .then(d => {//console.log(d)  
            if(d.error)
            {let newStr=((d.exception).slice(50,-1))
            alert(newStr)}
            else
            {
            setRecipe({title: "", ingredients: "", equipment: "", instructions: ""})
            setChecked(false)
            toTheDisplay(`/RecipeDisplayPage/${d.id}`)
           }})
          }       
                
  const handleRecipePatch = () =>{
    // console.log(recipe)

    const editedFormy = new FormData()
    pic && editedFormy.append('pic', pic)
    recipe.title && editedFormy.append('title', recipe.title)
    recipe.ingredients && editedFormy.append('ingredients', recipe.ingredients)
    recipe.instructions && editedFormy.append('instructions', recipe.instructions)
    editedFormy.append('cooked_by_user', recipe.cooked_by_user)

  fetch(`/backend/saved_recipes/${id}`, {
    method: "PATCH",
    body: editedFormy
        })
    .then((r) => r.json())
    .catch(err=>alert(err))
   .then(d => {//console.log(d)  
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
      .catch(err=>alert(err))
      .then(d=>{//console.log(d))
      toTheHouse("/")
    })}
    
    const handlePicAdd=(e)=>{
      setPic(e.target.files[0])

      const smallFormy = new FormData()
      smallFormy.append('pic', e.target.files[0])

      fetch('/backend/generate_preview', {
        method: "POST",
        body: smallFormy
            })
        .then((r) => r.json())
        .catch(err=>alert(err))
       .then(d => setPicPreview(d.preview_pic.url))
    }
    
    return(
      <>
        <Box style={{textAlign: "center", justifyContent: 'center'}} /*sx={{'& .MuiTextField-root': {  m: 1 },}}*/>
        <h1 style={{fontFamily: 'Roboto, sans-serif', fontWeight:'1000'}}>Add Your Recipe</h1>
        <TextField variant="filled" multiline style={{borderRadius: "10px", width: "90%", border: '1px solid black'}} value={recipe.title} label="Title" required name="title" onChange={handleRecipeWrite}/>
        <TextField variant="filled" multiline style={{marginTop: "12px", borderRadius: "10px", width: "90%", border: '1px solid black'}} value={recipe.ingredients} label="Ingredients" name="ingredients" onChange={handleRecipeWrite}/>
        <TextField variant="filled" multiline style={{marginTop: "12px", borderRadius: "10px", width: "90%", border: '1px solid black'}} value={recipe.instructions} label="Instructions" name="instructions" onChange={handleRecipeWrite}/>

        <div style={{justifyContent: 'center', display: 'flex', flexDirection: 'row'}} >
        <Switch onChange={handleSwitch} checked={checked}/> 
        <p style={{fontFamily:'Robot, sans-serif'}} > Have you made this recipe before?</p>
        </div>

        <form>
          <p style={{ fontFamily: 'Robot, sans-serif'}}> {id ? "Would you like to change the photo?" : "Would you like to add a photo?"} </p>
        <input type="file" multiple={false} accept="image/*" onChange={handlePicAdd} />
        <img style={{maxHeight:'150px'}} src={picPreview} alt={picPreview} />
        </form>
        {id ? <div> <Button style={{marginTop: "12px", fontFamily: 'Robot, sans-serif'}} variant="contained" onClick={handleRecipePatch}>SAVE CHANGES</Button> <Button style={{marginTop: "12px", fontFamily: 'Robot, sans-serif'}} variant="contained" onClick={handleRecipeDelete}>REMOVE FROM MY LIST</Button> </div>
        : <div><Button style={{marginTop: "12px", fontFamily: 'Robot, sans-serif'}} onClick={handleRecipeSubmit} variant="contained">CREATE</Button></div>}
        </Box>
        </>
    )
}

export default UserOriginal;