import {useParams} from 'react-router-dom'

function EditPage({recipe}){
    console.log(recipe)
    console.log(useParams().id)
    return(
        <>
        <p>Ello Guvnah!</p>
        </>
    )
}

export default EditPage;