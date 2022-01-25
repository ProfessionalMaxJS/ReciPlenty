import {useParams, Link, useNavigate} from 'react-router-dom'
import {useEffect, useState} from 'react'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import FormControlLabel from '@mui/material/FormControlLabel';
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
    const [foodPicUrl, setFoodPicUrl] = useState("")

    useEffect (()=>{
        if (id>999)
        {fetch(`https://api.spoonacular.com/recipes/${id}/information?includeNutrition=false&apiKey=b5e32d122c6b42b69718e6565a960525`)
        .then(r=>r.json())
        .then(d=>{
            let newStr=""
            console.log(d)
            d.extendedIngredients.map(eI=>newStr+=`${eI.original}; \n`)
            setRecipe({title: d.title, instructions: d.instructions, ingredients: newStr, userOriginal: false, source_url: d.sourceUrl, api_img: d.image})
        })}
        else
        {fetch(`/backend/saved_recipes/${id}`)
        .then(r=>r.json())
        .then(d=>{console.log(d)
                  setRecipe(d)
                  setChecked(d.cooked_by_user)
                  setFoodPicUrl(d.food_pic.url)})}
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
        <Card sx={{ position: "relative", top: "12px", left: "50%", transform: "translate(-50%)",  maxWidth: 1000, textAlign: "center" }}>
        {id<999 ? <CardMedia component="img" height="350" image={foodPicUrl} alt={recipe.title} /> : <CardMedia component="img" height="350" image={recipe.api_img} alt={recipe.title} />}
        <Typography style={{fontFamily: 'Lobster Two, cursive', fontWeight: "700", fontSize: "2.5em"}} >{recipe.title}</Typography>
        <Typography style={{fontFamily: 'Alice, serif'}} ><span style={{fontFamily: 'Lobster Two, cursive', fontSize: "1.5em", fontWeight: "700"}} >Ingredients:</span> {recipe.ingredients}</Typography>
        <Typography style={{fontFamily: 'Alice, serif'}}><span style={{fontFamily: 'Lobster Two, cursive', fontSize: "1.5em", fontWeight: "700"}}>Instructions:</span> {recipe.instructions}</Typography>
        {id<999 && <FormControlLabel disabled control={<Switch checked={checked}/>} label="Have you made this recipe before?" />}
        {id<999 ? <Link to="EditPage" >EDIT!</Link>
 : <Button onClick={handleRecipeSubmit}>SAVE!</Button>}
 </Card>
        </>
    )
}

export default RecipeDisplayPage
