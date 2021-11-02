//importation des composants à afficher
import Header from "../components/layout/Header";
import PostListing from "../components/cards/postListing"
import PostDeleteInterface from "../components/layout/postDeleteInterface";
import CommentListing from "../components/comments/commentList";

//importation des éléments contextuels liés à la récupération de donnée via l'API avec fetch.
import { useContext } from "react";
import ApiContext from "../ApiHandling/ApiContext";
import {useEffect,useState } from "react";


function SinglePost(){
      //On utilise le contexte pour pouvoir écrire la fonction fetch dans un autre fichier, ce qui permet de mieux ranger et aussi de créer une fonction fetch get réutilisable en fonction de l'URI fournie.
    const ApiCtx = useContext(ApiContext)    
 

    function getPostId(){
      return new Promise ((resolve) => { 
        resolve (localStorage.getItem("SinglePost"))
    })
    }

    //on récupère l'Id de l'utilisateur depuis le localStorage pour préparer le body de la requête
    let loadedPosts= ApiCtx.loadedPosts
    const loadedComments=ApiCtx.loadedComments
    
    useEffect(()=> { //useEffect évite une boucle infinie qui pousse le composant à se recharger à fois qu'il appelle fetch.
        getPostId().then(feedPostId =>{ //on a besoin de récuper les données de connection de l'utilisateur pour inclure son id dans l'URL de la requête
            console.log("feedUserId",feedPostId)
            ApiCtx.getPosts(`http://localhost:4000/api/post/single/${feedPostId}`)
        })}, []); //[] est vide car il n'ya pas d'external dependencie dans la fonction gérée par useEffect. S'il y'en avait eu, il aurait fallu les inclure dans l'array.
    console.log("loadedPosts", ApiCtx.loadedPosts)
    console.log("loadedComments : ",ApiCtx.loadedComments)
    
    useEffect(()=>{
        loadedPosts=ApiCtx.updatedComments

    },ApiCtx.updatedComment)

    return(
        <div>
            <Header headerType = "userFeed"/>
            <PostListing posts = {loadedPosts} title={"Page du Post"} />
            <PostDeleteInterface post = {loadedPosts} />
            <CommentListing comments={loadedComments}/>
        </div>
    )
} 

export default SinglePost