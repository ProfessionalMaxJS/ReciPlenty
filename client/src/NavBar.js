import * as React from 'react'
import {useState} from 'react'
import Box from '@mui/material/Box'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Button from '@mui/material/Button'
import Drawer from '@mui/material/Drawer'
import RecipesList from './RecipesList'
import SearchIcon from '@mui/icons-material/Search'
import { styled, alpha } from '@mui/material/styles'
import {useNavigate} from 'react-router-dom'
import InputBase from '@mui/material/InputBase'
import {ComboBox} from "@progress/kendo-react-dropdowns"


function NavBar({handleTrivia}){

  const fuckOff = () => {console.log("fuckOff!")}

  const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  }));
  
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    display: 'flex',
    pointerEvents: 'none',
    alignItems: 'center',
    justifyContent: 'center',
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  }));

    const [state, setState] = React.useState({
        // left: false,
        right: false,
    });
    
    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
          return;
        }
       setState({ ...state, [anchor]: open });
    };

    const [search, setSearch] = useState([])
    const handleSearch = (e) => {
      // console.log(e.target.value)
      let newArr = []
      fetch(`https://api.spoonacular.com/recipes/searchComplex?query=${e.target.value}&number=5&instructionsRequired=true&apiKey=b5e32d122c6b42b69718e6565a960525`)
      .then(r=>r.json())
      .then(data=>{data.results.map(dataItem=>newArr.push(dataItem.title))
                    setSearch(newArr)})
    }

    const toTheEditor = useNavigate()
    const handleAddRecipe = () => {
      toTheEditor("/UserOriginal")
    }

    return(
  <>
  <Box sx={{ flexGrow: 1 }}>
    <AppBar position="static">
      <Toolbar style={{justifyContent: "space-between"}}>

        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
        <StyledInputBase
            onChange={handleSearch}
            placeholder="Find a Recipe..."
            // inputProps={{ 'aria-label': 'search' }}
        />
        </Search>

        <ComboBox style={{border:"1px solid black", borderRadius:"5px", fontFamily: 'Alice, serif'}} placeholder="Find A Recipe..." onChange={handleSearch} data={search} />

        <Button style={{ fontFamily: 'Alice, serif', background: "white", color: "black", boxShadow: "5px 5px"}} variant="outlined" onClick={handleAddRecipe}>Write Your Own</Button>
        <Button style={{ fontFamily: 'Alice, serif', background: "white", color: "black", boxShadow: "5px 5px"}} variant="outlined" onClick={handleTrivia}>Trivia</Button>
        <Button style={{ fontFamily: 'Alice, serif', background: "white", color: "black", boxShadow: "5px 5px"}} variant="outlined" onClick={toggleDrawer('right', true)}>My Recipes</Button>
      </Toolbar>
    </AppBar>
  </Box>

  {/* I really want this whole following component to be styled with background color #E7EBF0. Find help! */}
  
  <div> 
    {['right'].map((anchor) => (
    <React.Fragment key={anchor}>
    <Drawer
      anchor={anchor}
      open={state[anchor]}
      onClose={toggleDrawer(anchor, false)}
      >
    <RecipesList />
    </Drawer>
    </React.Fragment>
    ))}
  </div>

  </>
    )
}

export default NavBar;