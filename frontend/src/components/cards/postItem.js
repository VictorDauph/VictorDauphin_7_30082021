//Ce fichier sert à mettre en forme une carte post à partir d'arrays de posts passés depuis postList.

import {useContext, useState, useEffect } from "react";
//Ce fichier sert à afficher un seul post sous forme de carte.
import {Card} from 'react-bootstrap'

//importaion du contexte d'authentification
import {AuthContext} from "../../authentification/authContext";

//importation du composant qui gère les likes
import LikeInterface from "../layout/likeInterface";


function PostItem(props) {
    //importation du contexte d'authentification
    const AuthCtx = useContext(AuthContext)

    //Message sert à afrficher les messages d'erreurs en provenance de l'API
    const [message, changeMessage] = useState("")

    //calcul du karma à ârtir des tables upvotes et downvotes
    const upVotes = props.usersUpvotes.length
    const downVotes =  props.usersDownvotes.length
    const karma= upVotes - downVotes

    console.log("post props", props )

    //l'affichage du drapeau de signalement de contenu est un state car il doit se modifier en réaction au clic de signalement.
    let isFlagged= props.flagged
    console.log("post : ", props.postId, "flagged on React ?", isFlagged)
    const[flagged,setFlagged] = useState(isFlagged)
    
    //On a besoin de vérifier si l'utilisateur est un admin ou un standard pour lui donner accès à la fonction unflag
    const isAdmin = AuthCtx.isAdmin();
    console.log("isAdmin", isAdmin)

    //UseEffect permet d'éxecuter le code indiqué à chaque modification de la variable dans l'Array. Ainsi on s'assure que le changement d'état s'applique bien à chaque modification de la variable, y compris lors de la navigation et du rafraîchiseement de la page.
    useEffect(() =>{
        setFlagged(isFlagged)
    },[isFlagged])

    //Cette fonction sert à flagger les posts
    function setFlaggedHandler(){
        return new Promise((resolve,reject) =>{
            console.log("flagging")
            AuthCtx.initHeadersForFetch("PUT").then( (init)=>{
                fetch(`http://localhost:4000/api/post/flag/${props.postId}`,init
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
                fetch(`http://localhost:4000/api/post/unflag/${props.postId}`,init
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

    return (    
        <div className="raw my-3 mx-3">
                <Card className="col col-md-6 mx-auto bg-secondary">
                    <Card.Body>
                        <Card.Title className="text-primary cursor-pointer"> <h3>{props.title} </h3> </Card.Title>
                        <Card.Text className="text-light"> 
                            <p>Karma: {karma} 
                                <span className="mini"> {/*Pouce levé blanc si post liké, pouce baissé blanc si post disliké, sinon pouces bleus */}
                                    <LikeInterface {...props} changeMessage={changeMessage} />
                                    <span className="text-danger mx-1"> {flagged? isAdmin? <i className="fas fa-flag cursor-pointer text-primary" onClick={setUnflaggedHandler}> Contenu acceptable </i> : <i className="fas fa-flag"> contenu signalé</i> : <i class="far fa-flag cursor-pointer" onClick={setFlaggedHandler}> signaler ce contenu</i>} </span>
                                </span> 
                            </p>
                            <p className="mini">
                                crée le: {props.createdAt} par 
                                <span className="text-primary cursor-pointer">  {props.userId} </span> 
                            </p>
                        </Card.Text>
                    </Card.Body>
                    <Card.Img variant="top" src={`http://localhost:4000/images/${props.imageUrl}`} />
                </Card>
                <p className="text-danger col col-md-6 mx-auto">{message}</p>
               
        </div>
    )
}
export default PostItem;

