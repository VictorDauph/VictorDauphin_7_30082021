//importation des composants à afficher
import Header from "../components/layout/Header";
import PostListing from "../components/cards/postListing"

//importation des éléments contextuels liés à la récupération de donnée via l'API avec fetch.
import { useContext } from "react";
import GetPostsContext from "../ApiHandling/getPostsContext";


import {useEffect } from "react";

//faux posts pour tests d'affichage
const allPostsDummy = [
    {
        postId:1,
        userId:7,
        title: "Post Dummy 1",
        imageUrl:"defaultImage.png",
        usersUpvotes:[8],
        usersDownvotes:[2,3],
        CreatedAt: "2021-09-29 13:16:50",
        updatedAt: "2021-10-18 15:51:5",
        flagged:0
    },
    {
        postId:2,
        userId:6,
        title: "Post Dummy 2",
        imageUrl:"defaultImage.png",
        usersUpvotes:[6,8],
        usersDownvotes:[2],
        CreatedAt: "2021-09-29 13:16:50",
        updatedAt: "2021-10-18 15:51:5",
        flagged:0
    },
]

function Feed(){
      //On utilise le contexte pour pouvoir écrire la fonction fetch dans un autre fichier, ce qui permet de mieux ranger et aussi de créer une fonction fetch get réutilisable en fonction de l'URI fournie.
    const getPostsCtx = useContext(GetPostsContext)    

    //allPosts Dummy est un array de faux posts codé en dur pour les tests d'affichage des composants.
    //const allPosts = allPostsDummy

    useEffect(()=> { //useEffect évite une boucle infinie qui pousse le composant à se recharger à fois qu'il appelle fetch.
        getPostsCtx.getPosts("http://localhost:4000/api/post")
      }, []); //[] est vide car il n'ya pas d'external dependencie dans la fonction gérée par useEffect. S'il y'en avait eu, il aurait fallu les inclure dans l'array.
    console.log("loadedPosts", getPostsCtx.loadedPosts)

    return(
    <div>
        <Header headerType = "feed"/>
        <PostListing posts = {getPostsCtx.loadedPosts} /> 
    </div>
    )
} 

export default Feed