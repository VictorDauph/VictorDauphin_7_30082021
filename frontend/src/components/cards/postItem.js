//Ce fichier sert à mettre en forme une carte post à partir d'arrays de posts passés depuis postList.

import {useContext, useState, useEffect } from "react";
//Ce fichier sert à afficher un seul post sous forme de carte.
import {Card} from 'react-bootstrap'
import ApiContext from "../../ApiHandling/ApiContext";

//importaion du contexte d'authentification
import {AuthContext} from "../../authentification/authContext";



function PostItem(props) {
    //importation du contexte d'authentification
    const AuthCtx = useContext(AuthContext)

    console.log("post props", props )

    //calcul du karma à ârtir des tables upvotes et downvotes
    const upVotes = props.usersUpvotes.length
    const downVotes =  props.usersDownvotes.length
    const karma= upVotes - downVotes

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


    //Ce groupe de fonctions sert à gérer les likes
    const usersUpvotesProps = props.usersUpvotes
    const usersDownvotesProps= props.usersDownvotes
    //On récupère l'UserId qui a servi à l'authentification de l'utilisateur et on le stock dans AuthentifiedUserId
    let authentifiedUserId = null
    AuthCtx.authentifiedUserDatas().then( datas=>{
       authentifiedUserId = datas.id
    })
   

    //hasUserLikedPost() est une fonction qui doit retourner 0 si l'utilisateur est neutre, 1 s'il a liké le post, -1 s'il l'a disliké.
    const ApiCtx = useContext(ApiContext)
    //stockage des arrays de likes et dislikes dans des states
    const[usersUpvotes,setUsersUpvotes] = useState(usersUpvotesProps)
    const[usersDownvotes,setUsersDownvotes] = useState(usersDownvotesProps)
 
    //détermination de l'état du post: liké 1 , disliké -1 ou neutre 0 ?
    let isLiked = 2
    const [UserHasLikedPost,setUserHasLikedPost] = useState();

    //La valeur retournée est stockée dans UserHasLikedPost
    function hasUserLikedPost(){
        console.log("user Upvotes array for post",props.postId, usersUpvotesProps, "user Id:", authentifiedUserId)
        if(usersUpvotesProps.includes(authentifiedUserId)){
            isLiked=1
            setUserHasLikedPost(isLiked)
            console.log("post liked :", props.postId)
        }
        else if(usersDownvotesProps.includes(authentifiedUserId)){
            isLiked=-1
            setUserHasLikedPost(isLiked)
            console.log("post disliked :", props.postId)
        }
        else{
            isLiked=0
            setUserHasLikedPost(isLiked)
            console.log("post not liked :", props.postId)
        }
    }

    function likePostHandler(){
        console.log("liking post")
        //requête POST pour ajout de like à la BDD
        ApiCtx.likePost(1,props.postId,authentifiedUserId)
            //modification du pouce
            isLiked = 1
            setUserHasLikedPost(isLiked)
            //modification du nombre de likes
            usersUpvotesProps.push(authentifiedUserId)
            setUsersUpvotes(usersUpvotesProps)
    }

    useEffect(()=>{
        hasUserLikedPost()
        setUsersUpvotes(usersUpvotesProps)
        setUsersDownvotes(usersDownvotesProps)
        setUserHasLikedPost(isLiked)
    },[])
    //useEffect permet de prendre en compte la modification des variables au fur et à mesure.
    useEffect(()=>{
        hasUserLikedPost()
        setUsersUpvotes(usersUpvotesProps)
        setUsersDownvotes(usersDownvotesProps)
        setUserHasLikedPost(isLiked)
    },[usersUpvotesProps,usersDownvotesProps,isLiked])
    



    


    return (    
        <div className="raw my-3 mx-3">
                <Card className="col col-md-6 mx-auto bg-secondary">
                    <Card.Body>
                        <Card.Title className="text-primary cursor-pointer"> <h3>{props.title} {UserHasLikedPost}</h3> </Card.Title>
                        <Card.Text className="text-light"> 
                            <p>Karma: {karma} 
                                <span className="mini"> {/*Pouce levé blanc si post liké, pouce baissé blanc si post disliké, sinon pouces bleus */}
                                    {UserHasLikedPost==1? <span className="text-white arrow cursor-pointer mx-1"> <i className="fas fa-thumbs-up"></i> </span>: <span className="text-primary arrow cursor-pointer mx-1" onClick={likePostHandler}> <i className="fas fa-thumbs-up"></i> </span> }  {upVotes} 
                                    {UserHasLikedPost==-1?<span className="text-white cursor-pointer mx-1"> <i className="fas fa-thumbs-down"></i> </span>:<span className="text-primary cursor-pointer mx-1"> <i className="fas fa-thumbs-down"></i> </span>} {downVotes} 
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

