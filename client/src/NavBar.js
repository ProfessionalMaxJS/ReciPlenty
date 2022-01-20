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
import TextField from '@mui/material/TextField'

function NavBar({handleTrivia}){

  const elloGuvnah = () => {console.log("elloGuvnah!")}

  // const [loggedIn, setLoggedIn] = useState(false)
  // useEffect(()=>{
  //   fetch("/backend/logged_in")
  //   .then(r=>r.json())
  //   .then(d=>setLoggedIn(d.logged_in))
  // }, [])

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
      fetch(`https://api.spoonacular.com/recipes/searchComplex?query=${search}&number=5&instructionsRequired=true&apiKey=b5e32d122c6b42b69718e6565a960525`)
      .then(r=>r.json())
      .then(data=>setRecipes(data.results))
      .then(setAnchorEl(event.currentTarget));

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
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
          return;
        }
       setState({ ...state, [anchor]: open });

        fetch("/backend/saved_recipes")
        .then(r=>r.json())
        .then(d=>setRecipes(d))

    };

return(
  <>
  <Box sx={{ flexGrow: 1 }}>
    <AppBar position="static">
      <Toolbar style={{justifyContent: "space-between"}}>

        <TextField style={{fontFamily: 'Alice, serif', color: "red", border: "1px solid white", borderRadius: "5px"}} placeholder="Find A Recipe..." value={search} onChange={handleSearch}/>
         <Button style={{ fontFamily: 'Alice, serif', background: "white", color: "black", boxShadow: "5px 5px"}} variant="outlined" onClick={handleSearchResults}>Search Results</Button>
        <Button style={{ fontFamily: 'Alice, serif', background: "white", color: "black", boxShadow: "5px 5px"}} variant="outlined" onClick={handleAddRecipe}>Write Your Own</Button>
        <Button style={{ fontFamily: 'Alice, serif', background: "white", color: "black", boxShadow: "5px 5px"}} variant="outlined" onClick={handleTrivia}>Trivia</Button>
        <Button style={{ fontFamily: 'Alice, serif', background: "white", color: "black", boxShadow: "5px 5px"}} variant="outlined" onClick={toggleDrawer('right', true)}>My Recipes</Button>
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


// const navTest = useNavigate()

//   function handleSignIn() {
//     fetch("/login", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(user),
//     })
//       .then((r) => r.json())
//       .catch((err) => {
//         console.log(err);
//       })
//       .then((data) => {
//         if (data.error) {
//           alert("Login Failed; Incorrect Name/Password Combination. Or Maye You Haven't Signed Up?")
//           console.log(data.error);
//         } else {
//           setUserData(data);
//           setIsLoggedIn(true);
//           navTest("/Menu")
//           console.log(data);
//           setChange(Math.random());
//         }
//       })
//       .then(
//         setUser({
//           name: "",
//           password: "",
//         })
//       );
//   }