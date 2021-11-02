//Ce fichier sert à mettre en forme une carte commentaire à partir d'arrays de posts passés depuis commentList.

import {useContext, useState, useEffect } from "react";

//importaion du contexte d'authentification
import {AuthContext} from "../../authentification/authContext";

import {Card} from 'react-bootstrap'

//Importation de useHistory pour  navigation programmatique
import { useHistory } from "react-router-dom";

//importation des interfaces de modification et suppression des commentaires
import CommentDeleteInterface from "../layout/commentDeleteInterface";

//modifier la liste des comments avec APIContext
function CommentItem(props){

    //history est est utilisée pour la navigation programmatique
    const history = useHistory() 

    //Message sert à afrficher les messages d'erreurs en provenance de l'API
    const [message, changeMessage] = useState("")
    const content= props.content
    const commentId= props.commentId
    const userId= props.userId
    console.log("comment item", props)

    const AuthCtx= useContext(AuthContext)

    //l'affichage du drapeau de signalement de contenu est un state car il doit se modifier en réaction au clic de signalement.
    let isFlagged= props.flagged
    console.log("comment : ", commentId, "flagged on React ?", isFlagged)
    const[flagged,setFlagged] = useState(isFlagged)

    //On a besoin de vérifier si l'utilisateur est un admin ou un standard pour lui donner accès à la fonction unflag
    const isAdmin = AuthCtx.isAdmin();
    console.log("isAdmin", isAdmin)

    //UseEffect permet d'éxecuter le code indiqué à chaque modification de la variable dans l'Array. Ainsi on s'assure que le changement d'état s'applique bien à chaque modification de la variable, y compris lors de la navigation et du rafraîchiseement de la page.
    useEffect(() =>{
        setFlagged(isFlagged)
    },[isFlagged])

    //Cette fonction sert à flagger les commentaires
    function setFlaggedHandler(){
        return new Promise((resolve,reject) =>{
            console.log("flagging")
            AuthCtx.initHeadersForFetch("PUT").then( (init)=>{
                fetch(`http://localhost:4000/api/comment/flag/${commentId}`,init
                ).then(data => data.json()
                ).then(res => {
                    console.log(res)
                    resolve(res)
                }).catch(err=>{reject(err)})
            }).catch(err=>{reject(err)})
        }).then(data => {
            isFlagged=true;
            setFlagged(isFlagged)
            changeMessage(data.message)})
        .catch(err => {changeMessage(err.message)})
        }
    
    function setUnflaggedHandler(){
        return new Promise((resolve,reject) =>{
            console.log("unflagging")
            AuthCtx.initHeadersForFetch("PUT").then( (init)=>{
                fetch(`http://localhost:4000/api/comment/unflag/${commentId}`,init
                ).then(data => data.json()
                ).then(res => {
                    console.log(res)
                    resolve(res)
                }).catch(err=>{reject(err)})
            }).catch(err=>{reject(err)})
        }).then(data => {
            isFlagged=false;
            setFlagged(isFlagged)
            changeMessage(data.message)})
        .catch(err => changeMessage(err.message))
    }
    
    function goToUserFeed(){
        console.log("goToTuserFeed", props.userId)
        localStorage.setItem("userFeed",props.userId)
        history.push("/userFeed")
    }

    return (
        <div>
            <Card className="col col-md-6 mx-auto bg-secondary py-3 px-3">
                <Card.Text className="text-light">
                <p className="mini">
                    crée le: {props.createdAt} par 
                    <span className="text-primary cursor-pointer" onClick={goToUserFeed}>  {userId} </span>
                </p>
                    <p>{content}</p>
                    <p>
                        {/* Affichage de l'interface de signalement/désignalement */}
                        <span className="text-danger mini mx-1"> {flagged? isAdmin? <i className="fas fa-flag cursor-pointer text-primary" onClick={setUnflaggedHandler}> Contenu acceptable </i> : <i className="fas fa-flag"> contenu signalé</i> : <i class="far fa-flag cursor-pointer" onClick={setFlaggedHandler}> signaler ce contenu</i>} </span></p>
                        <CommentDeleteInterface {...props}/>
                </Card.Text>
            </Card>
            <p className="text-danger col col-md-6 mx-auto">{message}</p>
        </div>
    )
        

}

export default CommentItem