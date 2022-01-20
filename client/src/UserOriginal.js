import {useState, useEffect} from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import '../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Switch from '@mui/material/Switch'

function UserOriginal(){
  const elloGuvnah = () => {console.log("elloGuvnah!")}

  const [recipe, setRecipe] = useState({})
  const id = useParams().id
  // console.log(id)
  const [checked, setChecked] = useState(false)

  useEffect(()=>{
    if(id){
      // console.log("elloGuvnah!")
      fetch(`/backend/saved_recipes/${id}`)
          .then(r=>r.json())
          .then(d=>{setRecipe(d)
                    setChecked(d.cooked_by_user)})}
  }, [id])

  const handleRecipeWrite = (e) =>{
    setRecipe({...recipe, [e.target.name]:e.target.value})
      // console.log(recipe)
    }
    const handleSwitch = (e) => {
      setChecked(!checked)
      setRecipe({...recipe, cooked_by_user: !checked})
  }

  const handleRecipeSubmit=(e)=>{
    setRecipe({...recipe, cooked_by_user: checked})
        fetch('/backend/add_user_recipe', {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(recipe),
          })
            .then((r) => r.json())
            .then((data) => {
              console.log(data);
            })
            .then(setRecipe({
              title: "",
              ingredients: "",
              equipment: "",
              instructions: ""
            }))
    }
   
  const handleRecipePatch = () =>{
    // console.log(recipe)
    fetch(`/backend/saved_recipes/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(recipe),
    })
      .then((r) => r.json())
      .then((data) => {
        console.log(data);
      })
}

const home = useNavigate()
const handleRecipeDelete = () =>{
  fetch(`/backend/saved_recipes/${id}`, {
    method: "DELETE"
  })
  .then(r=>r.json())
  .then(d=>console.log(d))

  home("/")
}
  

return(
        <>
        <Box style={{textAlign: "center"}} /*sx={{'& .MuiTextField-root': {  m: 1 },}}*/>
        <h1 style={{fontFamily: 'Alice, serif'}}>Add Your Recipe</h1>
        <TextField variant="filled" multiline style={{borderRadius: "10px", border: "5px solid blue", width: "90%"}} value={recipe.title} label="Title" required name="title" onChange={handleRecipeWrite}/>
        <TextField variant="filled" multiline style={{marginTop: "12px", borderRadius: "10px", border: "5px solid blue", width: "90%"}} value={recipe.ingredients} label="Ingredients" name="ingredients" onChange={handleRecipeWrite}/>
        <TextField variant="filled" multiline style={{marginTop: "12px", borderRadius: "10px", border: "5px solid blue", width: "90%"}} value={recipe.instructions} label="Instructions" name="instructions" onChange={handleRecipeWrite}/>

        <Switch onChange={handleSwitch} checked={checked}/>
        
        {id ? <div> <Button style={{marginTop: "12px", fontFamily: 'Alice, serif'}} variant="contained" onClick={handleRecipePatch}>EDIT!</Button> <Button style={{marginTop: "12px", fontFamily: 'Alice, serif'}} variant="contained" onClick={handleRecipeDelete}>BALEETED!</Button> </div>
        : <div><Button style={{marginTop: "12px", fontFamily: 'Alice, serif'}} onClick={handleRecipeSubmit} variant="contained">CREATE!</Button></div>}
        </Box>
        </>
    )
}

export default UserOriginal;