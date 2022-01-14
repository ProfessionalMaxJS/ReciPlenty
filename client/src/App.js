import NavBar from './NavBar';
import Test from "./Test"
import {Routes, Route} from 'react-router-dom'
import EditorComponent from "./EditorComponent"
function App() {




  return (
    <>
      <NavBar />
<Routes>
  <Route path="/" element={<Test />} />
  <Route path="/EditorComponent" element={<EditorComponent />} />
</Routes>
    </>
 
 );
}

export default App;
