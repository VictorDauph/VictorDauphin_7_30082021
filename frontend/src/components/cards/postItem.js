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
        console.log("flagging")
        AuthCtx.initHeadersForFetch("PUT").then( (init)=>{
            fetch(`http://localhost:4000/api/post/flag/${props.postId}`,init
            ).then(data => data.json()
            ).then(res => {
                console.log(res)
                isFlagged=true;
                setFlagged(isFlagged)
            })
        })
    }

    function setUnflaggedHandler(){
        console.log("unflagging")
        AuthCtx.initHeadersForFetch("PUT").then( (init)=>{
            fetch(`http://localhost:4000/api/post/unflag/${props.postId}`,init
            ).then(data => data.json()
            ).then(res => {
                console.log(res)
                isFlagged=false;
                setFlagged(isFlagged)
            })
        })
    }

    return (    
        <div className="raw my-3 mx-3">
                <Card className="col col-md-6 mx-auto bg-secondary">
                    <Card.Body>
                        <Card.Title className="text-primary cursor-pointer"> <h3>{props.title} </h3> </Card.Title>
                        <Card.Text className="text-light"> 
                            <p>Karma: {karma} 
                                <span className="mini"> {/*Pouce levé blanc si post liké, pouce baissé blanc si post disliké, sinon pouces bleus */}
                                    <LikeInterface {...props} />
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
        </div>
    )
}
export default PostItem;

