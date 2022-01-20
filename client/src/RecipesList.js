import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import {useNavigate} from 'react-router-dom'

function RecipesList({recipes}){

  const elloGuvnah = () => {console.log("elloGuvnah!")}
  const toThePage = useNavigate()

    const Item = styled(Paper)(({ theme }) => ({
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        fontFamily: 'Alice, serif',
        color: theme.palette.text.secondary,
      }));


    return(
      <>
        <Stack divider={<Divider orientation="vertical" flexItem />} spacing={1}>
        {recipes.map(r=><Item className="handy" onClick={()=>{toThePage(`/RecipeDisplayPage/${r.id}`)}} key={r.id}>{r.title}</Item>)}
        </Stack>
      </>
    )
  }
export default RecipesList
