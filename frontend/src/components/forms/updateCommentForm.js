//Ce commposant sert à entrer du texte puis créé la requête http pour mettre à jour un commentaire

//react-bootstrap permet d'utiliser des composant spécifiques pour les Form et les Button
import {Form, Button} from "react-bootstrap"
//useRef permet de lire le contenu d'un input.
import {useRef, useContext} from "react"; 

import { AuthContext } from "../../authentification/authContext";
import ApiContext from "../../ApiHandling/ApiContext";


function UpdateCommentForm(props){
    //variables de lecture des inputs
    const commentInput = useRef()
    //importation des contextes d'authentification et d'API
    const AuthCtx = useContext(AuthContext)
    const ApiCtx= useContext(ApiContext)

    //tableau des commentaires du post chargés depuis le contexte de l'Api:
    let loadedComments=ApiCtx.loadedComments
    //commentIndex est l'index du commentaire dans loadedComments, il est déterminé pas FindIndexOfComments
    let commentIndex=-1


 
    let loggedUserId = null
    AuthCtx.authentifiedUserDatas().then(userDatas =>{
        loggedUserId=userDatas.id
    })

    const commentId=props.commentId

    function findIndexOfComment(){
        loadedComments.map(loadedComment=>{
            const index = loadedComments.indexOf(loadedComment)
            if(loadedComment.commentId == commentId){
                commentIndex=index
                console.log("found index :", commentIndex, "of CommentId :", commentId) 
            }
        })
    }
 

    function handleSubmit(event){
        event.preventDefault(); //empêche le rechargement de la page. comportement pas défaut du bouton
        const commentValue = commentInput.current.value
        findIndexOfComment()
        const contentBody= commentInput.current.value
        const requestBody = {
            content:contentBody,
            userId:loggedUserId
        }
        console.log("Updated comment content :", commentValue, "index :", commentIndex, "requestBody :",requestBody)

        //fetch ici, importé via les props depuis CommentUpdateInterface?
        AuthCtx.initHeadersForFetch("PUT",requestBody).then(init =>{
            fetch(`http://localhost:4000/api/comment/${commentId}`,init).then(res => res.json()).then( res => {
                props.changeMessage(res.message)
                loadedComments[commentIndex]=contentBody
                props.setContent(contentBody)
            }).catch(res => {props.changeMessage(res.message)})
            .then(()=>{props.setIsModifying(false) })//fermeture du formulaire
        })

        
    }
    
    return(
            <div className="container">
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="p-3 mb-5 rounded text-primary bg-secondary" controlId="formText">
                        <Form.Label>Titre</Form.Label>
                        <Form.Control type="text" as="textarea" placeholder="Modifiez votre commentaire" ref={commentInput} />
                    </Form.Group>
                    <Button className="text-dark bg-primary border-0" type="submit">
                        Modifier Commentaire!
                    </Button>
                </Form>
            </div>
    )
}
export default UpdateCommentForm