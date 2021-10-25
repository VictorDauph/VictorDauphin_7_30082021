//Ce fichier sert à mettre en forme une carte post à partir d'arrays de posts passés depuis postList.

import {useContext, useState, useEffect } from "react";
//Ce fichier sert à afficher un seul post sous forme de carte.
import {Card} from 'react-bootstrap'

//importaion du contexte d'authentification
import {AuthContext} from "../../authentification/authContext";



function PostItem(props) {
    //importaion du contexte d'authentification
    const AuthCtx = useContext(AuthContext)

    console.log("post props", props )

    //calcul du karma à ârtir des tables upvotes et downvotes
    const upVotes = props.usersUpvotes.length
    const downVotes =  props.usersDownvotes.length
    const karma= upVotes - downVotes

    //l'affichage du drapeau de signalement de contenu est un state car il doit se modifier en réaction au clic de signalement.
    const flagInit= props.flagged
    console.log("post : ", props.postId, "flagged on React ?", flagInit)
    const[flagged,setFlagged] = useState(props.flagged)
    
    //On a besoin de vérifier si l'utilisateur est un admin ou un standard pour lui donner accès à la fonction unflag
    const isAdmin = AuthCtx.isAdmin();
    console.log("isAdmin", isAdmin)

    //Cette fonction sert à flagger les posts
    function setFlaggedHandler(){ 
        console.log("flagging")
        AuthCtx.initHeadersForFetch("PUT").then( (init)=>{
            fetch(`http://localhost:4000/api/post/flag/${props.postId}`,init
            ).then(data => data.json()
            ).then(res => {
                console.log(res)
                setFlagged(true)
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
                setFlagged(false)
            })
        })

    }
    

    return (    
        <div className="raw my-3 mx-3">
                <Card className="col col-md-6 mx-auto bg-secondary">
                    <Card.Body>
                        <Card.Title className="text-primary cursor-pointer"> <h3>{props.title}</h3> </Card.Title>
                        <Card.Text className="text-light"> 
                            <p>Karma: {karma} 
                                <span className="mini"> 
                                    <span className="text-primary arrow cursor-pointer mx-1"> <i className="fas fa-thumbs-up"></i> </span> {upVotes} 
                                    <span className="text-primary cursor-pointer mx-1"> <i className="fas fa-thumbs-down"></i> </span> {downVotes} 
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

