import {useParams, Link, useNavigate} from 'react-router-dom'
import {useEffect, useState} from 'react'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import Switch from '@mui/material/Switch'

function RecipeDisplayPage({loggedIn, setLoggedIn}){

  const elloGuvnah = () => {console.log("elloGuvnah!")}

  useEffect(()=>{
    fetch("/backend/logged_in")
    .then(r=>r.json())
    .then(d=>{console.log(d)
      setLoggedIn(d.logged_in)})
    }, [setLoggedIn])
    
  const toTheHouse = useNavigate()
 
  if(loggedIn===false)
    {toTheHouse("/")
    alert("Sorry, you must be logged in to use this feature")}

    const id = useParams().id
    // console.log(id)
    const [checked, setChecked] = useState(false)    
    const [recipe, setRecipe] = useState({})

    useEffect (()=>{
        if (id>999)
        {fetch(`https://api.spoonacular.com/recipes/${id}/information?includeNutrition=false&apiKey=b5e32d122c6b42b69718e6565a960525`)
        .then(r=>r.json())
        .then(d=>{
            let newStr=""
            // console.log(d)
            d.extendedIngredients.map(eI=>newStr+=`${eI.name} \n`)
            setRecipe({title: d.title, instructions: d.instructions, ingredients: newStr, userOriginal: false, source_url: d.sourceUrl})
        })}
        else
        {fetch(`/backend/saved_recipes/${id}`)
        .then(r=>r.json())
        .then(d=>{setRecipe(d)
                  setChecked(d.cooked_by_user)})}
    }, [id])

    const handleRecipeSubmit = () => {
        fetch('/backend/add_api_recipe', {
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
    }

  // const [checked, setChecked] = useState(false)

    return (
        <>
        <Card>
        <Typography>{recipe.title}</Typography>
        <Typography>{recipe.ingredients}</Typography>
        <Typography>{recipe.instructions}</Typography>
        <Switch checked={checked} disabled/>
        </Card>
        {id<999 ? <Link to="EditPage" >EDIT!</Link>
 : <Button onClick={handleRecipeSubmit}>SAVE!</Button>}
        </>
    )
}

export default RecipeDisplayPage
