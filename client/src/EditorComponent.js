import {useState, useEffect} from 'react'
import {EditorState, convertToRaw, convertFromRaw} from 'draft-js'
import { Editor } from 'react-draft-wysiwyg';
import EditBox from './EditBox'
import '../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'


function EditorComponent(){

  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
  // const [anotherEditorState, setAnotherEditorState] = useState(() => EditorState.createEmpty());
  console.log(convertToRaw(editorState.getCurrentContent()))


    const handleRecipeSubmit=(e)=>{
        // console.log("elloGuvnah!")

        fetch("/backend/saved_recipes", {
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
            .then(setRecipe({
                title: "",
                ingredients: "",
                equipment: "",
                instructions: ""
            }))
    }

    const [recipe, setRecipe] = useState({})
    // const handleRecipeWrite = (e) =>{
    //     setRecipe({...recipe, [e.target.name]:e.target.value})
    //     // console.log(e.target.value)
    //     console.log(recipe)
    // }

const handleContent=()=>{
  fetch("/backend/saved_recipes", {
    method: "POST",
    headers: {
        "Content-Type" : "application/json"
    },
    body:  JSON.stringify({title: JSON.stringify(convertToRaw(editorState.getCurrentContent()))})
  })
  .then(r=>r.json())
  .then(d=>console.log(d))
}

const [anotherEditorState, setAnotherEditorState] = useState(() => EditorState.createWithContent(convertFromRaw(JSON.parse(selectedNote.content))));

useEffect(()=>{
  fetch("/backend/saved_recipes/12")
  .then(r=>r.json())
  .then(d=>{
    console.log(d)
    console.log(d.title)
    setAnotherEditorState(convertFromRaw(d.title))
  })

},[])


    return(
        <>
        {/* <TextField value={recipe.title} name="title" onChange={handleRecipeWrite}/>
        <TextField value={recipe.ingredients} name="ingredients" onChange={handleRecipeWrite}/>
        <TextField value={recipe.equipment} name="equipment" onChange={handleRecipeWrite}/>
        <TextField value={recipe.instructions} name="instructions" onChange={handleRecipeWrite}/> */}
        <button onClick={handleContent}>submit</button>
        <Editor 
                onEditorStateChange={setEditorState}
                wrapperStyle={{border:"1px solid blue"}}
                editorStyle={{border: "2px solid black"}}
                toolbar={{
                  options: ['inline', 'fontSize', 'fontFamily', 'emoji'],
                  // inline: {
                  //   options: ['bold', 'italic', 'underline', 'strikethrough', 'superscript', 'subscript'],
                  //   bold: { className: 'bordered-option-classname' },
                  //   italic: { className: 'bordered-option-classname' },
                  //   underline: { className: 'bordered-option-classname' },
                  //   strikethrough: { className: 'bordered-option-classname' },
                  //   superscript: { className: 'bordered-option-classname' },
                  //   subscript: { className: 'bordered-option-classname' },
                  // },
                  // fontSize: {
                  //   className: 'bordered-option-classname',
                  // },
                  // fontFamily: {
                  //   className: 'bordered-option-classname',
                  // }
                  // , 
                  // emoji: {
                  //   className: undefined,
                  //   component: undefined,
                  //   popupClassName: undefined,
                  //   emojis: [
                  //     '😀', '😁', '😂', '😃', '😉', '😋', '😎', '😍', '😗', '🤗', '🤔', '😣', '😫', '😴', '😌', '🤓',
                  //     '😛', '😜', '😠', '😇', '😷', '😈', '👻', '😺', '😸', '😹', '😻', '😼', '😽', '🙀', '🙈',
                  //     '🙉', '🙊', '👼', '👮', '🕵', '💂', '👳', '🎅', '👸', '👰', '👲', '🙍', '🙇', '🚶', '🏃', '💃',
                  //     '⛷', '🏂', '🏌', '🏄', '🚣', '🏊', '⛹', '🏋', '🚴', '👫', '💪', '👈', '👉', '👉', '👆', '🖕',
                  //     '👇', '🖖', '🤘', '🖐', '👌', '👍', '👎', '✊', '👊', '👏', '🙌', '🙏', '🐵', '🐶', '🐇', '🐥',
                  //     '🐸', '🐌', '🐛', '🐜', '🐝', '🍉', '🍄', '🍔', '🍤', '🍨', '🍪', '🎂', '🍰', '🍾', '🍷', '🍸',
                  //     '🍺', '🌍', '🚑', '⏰', '🌙', '🌝', '🌞', '⭐', '🌟', '🌠', '🌨', '🌩', '⛄', '🔥', '🎄', '🎈',
                  //     '🎉', '🎊', '🎁', '🎗', '🏀', '🏈', '🎲', '🔇', '🔈', '📣', '🔔', '🎵', '🎷', '💰', '🖊', '📅',
                  //     '✅', '❎', '💯',
                  //   ],
                  // },
                }}                  
        />
        <EditBox onEditorStateChange={setAnotherEditorState} />
        <EditBox />
        <EditBox />
      
        <Button onClick={handleRecipeSubmit} variant="contained">CREATE!</Button>
        </>
    )
}

export default EditorComponent;