import {useState} from 'react'
import {EditorState, convertToRaw} from 'draft-js'
import { Editor } from 'react-draft-wysiwyg';
import '../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

function EditorComponent(){

    const handleRecipeSubmit=(e)=>{
        // console.log("elloGuvnah!")

        fetch("/backend/saved_recipes", {
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
        // console.log(e.target.value)
        console.log(recipe)
    }


    return(
        <>
        <form>
        <TextField value={recipe.title} name="title" onChange={handleRecipeWrite}/>
        <TextField value={recipe.ingredients} name="ingredients" onChange={handleRecipeWrite}/>
        <TextField value={recipe.equipment} name="equipment" onChange={handleRecipeWrite}/>
        <TextField value={recipe.instructions} name="instructions" onChange={handleRecipeWrite}/>
        <Button onClick={handleRecipeSubmit} variant="contained">CREATE!</Button>
        </form>
        </>
    )
}

export default EditorComponent;