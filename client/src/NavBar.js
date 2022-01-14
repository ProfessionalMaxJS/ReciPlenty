import * as React from 'react';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Button from '@mui/material/Button'
import Drawer from '@mui/material/Drawer';
import {useState} from 'react'
import {useNavigate} from 'react-router-dom'

function NavBar(){

    const [state, setState] = React.useState({
        left: false,
        right: false,
    });
    
    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
          return;
        }
    
       setState({ ...state, [anchor]: open });
    };

    const fuckOff = () => {console.log("fuckOff!")}

    const [trivia, setTrivia] = useState("")
    const handleTrivia = () =>{
        fetch("https://api.spoonacular.com/food/trivia/random?apiKey=b5e32d122c6b42b69718e6565a960525")
        .then(r=>r.json())
        .catch(err=>alert(err))
        .then(d=>setTrivia(d.text))
    }

    const aFemaleDeer = useNavigate()
    const doeReMi = () => {
      aFemaleDeer("/EditorComponent")
    }

    return(
        <>
        <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar style={{justifyContent: "space-between"}}>
            <Button style={{background: "white"}} variant="outlined" onClick={doeReMi}>Test</Button>
            <Button style={{background: "white"}} variant="outlined" onClick={fuckOff}>Test2</Button>
            <Button style={{background: "white"}} variant="outlined" onClick={handleTrivia}>Trivia</Button>
            <Button style={{background: "white"}} variant="outlined" onClick={toggleDrawer('right', true)}>My Recipes</Button>
        </Toolbar>
        </AppBar>
        </Box>

        <div>
      {['left', 'right'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            fuckOff!
          </Drawer>
        </React.Fragment>
      ))}
    </div>
        <h1>{trivia}</h1>
        </>
    )
}

export default NavBar;