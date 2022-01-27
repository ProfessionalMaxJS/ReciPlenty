import {useParams, Link, useNavigate} from 'react-router-dom'
import {useEffect, useState} from 'react'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import Switch from '@mui/material/Switch'


function RecipeDisplayPage(){

  // const elloGuvnah = () => {console.log("elloGuvnah!")}
  const toTheHouse = useNavigate()

  useEffect(()=>{
    fetch("/backend/logged_in")
    .then(r=>r.json())
    .then(d=>{console.log(d)
     if(d.logged_in===false)
     {toTheHouse("/")
      alert("Sorry, this Page is Only for Saved Recipes (a Feature only Available to Members Whov've Signed Up or Logged In)")}})
    }, [])

 
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
      .then(d=>{//console.log(d)
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
              console.log(data)
              if(data.errors)
              {alert(`Unable to save this recipe, ${data.errors[0]}`)}
              else
              {alert(`${data.title} Added to Your List`)}
            })
    }

  const handleSwitch = (e) => {
      setChecked(!checked)
      // setRecipe({...recipe, cooked_by_user: !checked})

      fetch(`/backend/saved_recipes/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({cooked_by_user: !checked}),
      })
        .then((r) => r.json())
        .then((data) => {
          console.log(data)
        })
    }

    return (
        <>
        <Card sx={{ display: 'flex', flexDirection: 'column', position: "relative", top: "12px", boxShadow: "10px 10px #737578", marginBottom: '50px', border: '5px solid', borderColor:'#1976D2', borderRadius: '10px', left: "50%", transform: "translate(-50%)",  maxWidth: 1000, textAlign: "center" }}>
        {id<999 && 
        <div style={{justifyContent: 'center', display: 'flex', flexDirection: 'row'}} >
        <Switch onChange={handleSwitch} checked={checked}/> 
        <p style={{fontFamily:'Alice, serif'}} > {checked ? "I HAVE Made this Recipe Already!" : "I HAVE NOT Made This Recipe (Yet?)"}</p>
        </div>}
        <CardMedia component="img" height="350" image={id<999 ? foodPicUrl : recipe.api_img} alt={id<999 ? recipe.title : recipe.title} />
        <Typography style={{fontFamily: 'Alice, serif', fontWeight: "700", fontSize: "2.5em"}} >{recipe.title}</Typography>
        <Typography style={{fontFamily: 'Alice, serif'}} ><span style={{fontFamily: 'Alice, cursive', fontSize: "1.5em", fontWeight: "700"}} >Ingredients:</span> {recipe.ingredients}</Typography>
        <Typography style={{fontFamily: 'Alice, serif'}}><span style={{fontFamily: 'Alice, cursive', fontSize: "1.5em", fontWeight: "700"}}>Instructions:</span> {recipe.instructions}</Typography>
        {id<999 ? <Link to="EditPage" style={{color:'white', background:'#1976D2', paddingTop: '5px'}} >EDIT!</Link>
 : <Button variant="contained" style={{fontFamily: 'Alice, serif', marginTop: "2px"}} onClick={handleRecipeSubmit}>SAVE THIS RECIPE</Button>}
 </Card>
        </>
    )
}

export default RecipeDisplayPage
