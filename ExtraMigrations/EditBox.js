import {EditorState, convertToRaw} from 'draft-js'
import { Editor } from 'react-draft-wysiwyg';
import '../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import {useState} from 'react'

function EditBox({editorState, setEditorState}){

    // const [editorState, setEditorState] = useState(() => EditorState.createEmpty());


    return(
        <Editor
        wrapperStyle={{border:"1px solid blue"}}
        editorStyle={{border: "2px solid black"}}
        toolbar={{
          options: ['inline', 'fontSize', 'fontFamily', 'list', 'textAlign', 'emoji'],
          inline: {
            options: ['bold', 'italic', 'underline', 'strikethrough', 'superscript', 'subscript'],
            bold: { className: 'bordered-option-classname' },
            italic: { className: 'bordered-option-classname' },
            underline: { className: 'bordered-option-classname' },
            strikethrough: { className: 'bordered-option-classname' },
            superscript: { className: 'bordered-option-classname' },
            subscript: { className: 'bordered-option-classname' },
          },
          fontSize: {
            className: 'bordered-option-classname',
          },
          fontFamily: {
            className: 'bordered-option-classname',
          }, list: {
            inDropdown: false,
            className: undefined,
            component: undefined,
            dropdownClassName: undefined,
            options: ['unordered', 'ordered', 'indent', 'outdent'],
            unordered: { className: 'bordered-option-classname' },
            ordered: { className: 'bordered-option-classname' },
            indent: {className: 'bordered-option-classname' },
            outdent: { className: 'bordered-option-classname' },
          },
          textAlign: {
            inDropdown: false,
            className: undefined,
            component: undefined,
            dropdownClassName: undefined,
            options: ['left', 'center', 'right', 'justify'],
            left: { className: 'bordered-option-classname' },
            center: { className: 'bordered-option-classname' },
            right: { className: 'bordered-option-classname' },
            justify: { className: 'bordered-option-classname' },
          },  
          emoji: {
            className: undefined,
            component: undefined,
            popupClassName: undefined,
            emojis: [
              '😀', '😁', '😂', '😃', '😉', '😋', '😎', '😍', '😗', '🤗', '🤔', '😣', '😫', '😴', '😌', '🤓',
              '😛', '😜', '😠', '😇', '😷', '😈', '👻', '😺', '😸', '😹', '😻', '😼', '😽', '🙀', '🙈',
              '🙉', '🙊', '👼', '👮', '🕵', '💂', '👳', '🎅', '👸', '👰', '👲', '🙍', '🙇', '🚶', '🏃', '💃',
              '⛷', '🏂', '🏌', '🏄', '🚣', '🏊', '⛹', '🏋', '🚴', '👫', '💪', '👈', '👉', '👉', '👆', '🖕',
              '👇', '🖖', '🤘', '🖐', '👌', '👍', '👎', '✊', '👊', '👏', '🙌', '🙏', '🐵', '🐶', '🐇', '🐥',
              '🐸', '🐌', '🐛', '🐜', '🐝', '🍉', '🍄', '🍔', '🍤', '🍨', '🍪', '🎂', '🍰', '🍾', '🍷', '🍸',
              '🍺', '🌍', '🚑', '⏰', '🌙', '🌝', '🌞', '⭐', '🌟', '🌠', '🌨', '🌩', '⛄', '🔥', '🎄', '🎈',
              '🎉', '🎊', '🎁', '🎗', '🏀', '🏈', '🎲', '🔇', '🔈', '📣', '🔔', '🎵', '🎷', '💰', '🖊', '📅',
              '✅', '❎', '💯',
            ],
          },
        }}
         editorState={editorState}
         onEditorStateChange={setEditorState}
                    />

    )
}

export default EditBox;