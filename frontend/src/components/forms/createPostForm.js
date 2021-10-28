//Le composant createPostForm permet d'afficher et de gérer l'interface de création de posts.

//react-bootstrap permet d'utiliser des composant spécifiques pour les Form et les Button
import {Form, Button} from "react-bootstrap"
//useRef permet de lire le contenu d'un input.
import {useRef} from "react"; 

function CreatePostForm(props){
    const titleInput = useRef()
    const formFileInput = useRef()

    function handleSubmit(event){
        event.preventDefault(); //empêche le rechargement de la page. comportement pas défaut du bouton
        const title = titleInput.current.value
        const file = formFileInput.current.value
        props.changeMessage(title)
        console.log("file :", file) // /!\ Comment on envoie un fichier?
    }
    
    return(
            <main className="container">
        <Form onSubmit={handleSubmit}>
            <Form.Group className="p-3 mb-5 rounded text-primary bg-secondary" controlId="formTitle">
                <Form.Label>Titre</Form.Label>
                <Form.Control type="text" placeholder="entrez le titre du post" ref={titleInput} />
            </Form.Group>

            <Form.Group className="p-3 mb-5 rounded text-primary bg-secondary" controlId="formFile">
                <Form.Label>Sélectionner une image</Form.Label>
                <Form.Control type="file" ref={formFileInput} />
            </Form.Group>

            <Button className="text-primary bg-secondary border-0" type="submit">
                Créer Post!
            </Button>
        </Form>
            </main>
    )
}
export default CreatePostForm