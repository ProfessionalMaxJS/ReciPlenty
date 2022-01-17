import {useState, useEffect} from 'react'
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';


function RecipesList(){
    
    const Item = styled(Paper)(({ theme }) => ({
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        fontFamily: 'Alice, serif',
        color: theme.palette.text.secondary,
      }));

    const [recipes, setRecipes] = useState([])
    useEffect(()=>{
        fetch("/backend/saved_recipes")
        .then(r=>r.json())
        .then(d=>{console.log(d)
                  setRecipes(d)})
    }, [])

    return(
        <>
        <Stack divider={<Divider orientation="vertical" flexItem />} spacing={1}>
        {recipes.map(r=><Item key={r.id}>{r.title}</Item>)}
        </Stack>
        </>
        )
}
export default RecipesList
