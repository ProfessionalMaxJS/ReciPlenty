import * as React from 'react'
import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import Box from '@mui/material/Box'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Button from '@mui/material/Button'
import Drawer from '@mui/material/Drawer'
import RecipesList from './RecipesList'
import Menu from '@mui/material/Menu'
import SearchIcon from '@mui/icons-material/Search';

function NavBar({loggedIn}){

  // const elloGuvnah = () => {console.log("elloGuvnah!")}

  const [state, setState] = React.useState({
    // left: false,
    right: false,
  });
      
    const [recipes, setRecipes] = useState([])
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);    
    const [search, setSearch] = useState("")

    const handleSearch = (e) => {setSearch(e.target.value)}

    const handleSearchResults = (event) => {
      event.preventDefault()
      if(loggedIn)
      {fetch(`https://api.spoonacular.com/recipes/searchComplex?query=${search}&number=5&instructionsRequired=true&apiKey=b5e32d122c6b42b69718e6565a960525`)
      .then(r=>r.json())
      .then(data=>setRecipes(data.results))
      .then(setAnchorEl(event.currentTarget));}
      else
      {alert("Sorry, you need to be logged in to use that feature.")}
    };

    const handleClose = () => {
      setAnchorEl(null);
      setSearch("")
    };
    
    const toTheEditor = useNavigate()
    const handleAddRecipe = () => {
      toTheEditor("/UserOriginal")
    }
    
    const toggleDrawer = (anchor, open) => (event) => {
      if(loggedIn)
        {if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
          return;
        }
       setState({ ...state, [anchor]: open });

        fetch("/backend/saved_recipes")
        .then(r=>r.json())
        .then(d=>setRecipes(d))}
      else
        {alert("Sorry, you need to be logged in to use that feature.")}

    };

    const toTheHouse = useNavigate()
    const handleHome = () =>{
      toTheHouse("/")
    }

return(
  <>

  <Box sx={{ flex: 'auto' }}>
    <AppBar  position="static">
      <Toolbar style={{justifyContent: "space-between", padding: "10px"}} >

  <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'left'}}>

  <form style={{display:'flex'}} onSubmit={handleSearchResults}>
    
    <input type="text" style={{fontFamily: 'Alice, serif', border: "2px solid black", borderRadius: "5px", color: "black", boxShadow: "5px 5px"}} placeholder="Find A Recipe..." value={search} onChange={handleSearch}></input>
    
    <button className="handy" style={{ marginLeft: '-10px', borderRadius: '4px', width: '60px', fontFamily: 'Alice, serif', background: "white", color: "black", boxShadow: "5px 5px"}} variant="outlined" ><SearchIcon /></button>
  
  </form>

    <Button style={{ margin: '5px 0 0 10px', fontFamily: 'Alice, serif', background: "white", color: "black", boxShadow: "5px 5px"}} variant="outlined" onClick={handleAddRecipe}>Write Your Own</Button>

  </div>

        <p className="handy" onClick={handleHome} style={{ position:'absolute', left:'50%', transform: 'translateX(-50%)', fontSize: '4em', color: 'white', fontFamily: 'Lobster Two, cursive', fontWeight: '700'}} >ReciPlenty</p>
        <Button style={{ justifyContent: 'right', fontFamily: 'Alice, serif', background: "white", color: "black", boxShadow: "5px 5px"}} variant="outlined" onClick={toggleDrawer('right', true)}>My Recipes</Button>
      </Toolbar>
    </AppBar>
  </Box>

  {/* I really want this whole following Drawer component to be styled with background color #E7EBF0. Find help! */}
  
  <div> 
    {['right'].map((anchor) => (
    <React.Fragment key={anchor} 
    >
    <Drawer
      anchor={anchor}
      open={state[anchor]}
      onClose={toggleDrawer(anchor, false)}
      >
    <RecipesList recipes={recipes}/>
    </Drawer>
    </React.Fragment>
    ))}
  </div>

      {/* Menu Component */}
  <div>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <RecipesList recipes={recipes}/>
      </Menu>
    </div>
  </>
    )
}

export default NavBar;