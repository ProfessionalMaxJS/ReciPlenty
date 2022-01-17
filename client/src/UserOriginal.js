import {useState} from 'react'
import '../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'

function UserOriginal(){

    const handleRecipeSubmit=(e)=>{

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

    const [recipe, setRecipe] = useState({})
    const handleRecipeWrite = (e) =>{
        setRecipe({...recipe, [e.target.name]:e.target.value})
        // console.log(recipe)
    }

    return(
        <>
        <Box sx={{
        '& .MuiTextField-root': {  m: 1 },
      }}>
        <h1 style={{fontFamily: 'Alice, serif'}}>Add Your Recipe</h1>
        <TextField variant="filled" multiline style={{borderRadius: "10px", border: "5px solid blue"}} fullWidth value={recipe.title} label="Title" required name="title" onChange={handleRecipeWrite}/>
        <TextField variant="filled" multiline style={{borderRadius: "10px", border: "5px solid blue"}} fullWidth value={recipe.ingredients} label="Ingredients" name="ingredients" onChange={handleRecipeWrite}/>
        <TextField variant="filled" multiline style={{borderRadius: "10px", border: "5px solid blue"}} fullWidth value={recipe.equipment} label="Equipment" name="equipment" onChange={handleRecipeWrite}/>
        <TextField variant="filled" multiline style={{borderRadius: "10px", border: "5px solid blue"}} fullWidth value={recipe.instructions} label="Instructions" name="instructions" onChange={handleRecipeWrite}/>
        </Box>
        <Button style={{fontFamily: 'Alice, serif'}} onClick={handleRecipeSubmit} variant="contained">CREATE!</Button>
        </>
    )
}

export default UserOriginal;