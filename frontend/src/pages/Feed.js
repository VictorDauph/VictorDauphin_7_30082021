//importation des composants à afficher
import Header from "../components/layout/Header";
import PostListing from "../components/cards/postListing"

//importation des éléments contextuels liés à la récupération de donnée via l'API avec fetch.
import { useContext } from "react";
import ApiContext from "../ApiHandling/ApiContext";


import {useEffect } from "react";

function Feed(){
      //On utilise le contexte pour pouvoir écrire la fonction fetch dans un autre fichier, ce qui permet de mieux ranger et aussi de créer une fonction fetch get réutilisable en fonction de l'URI fournie.
    const ApiCtx = useContext(ApiContext)    

    //allPosts Dummy est un array de faux posts codé en dur pour les tests d'affichage des composants.
    //const allPosts = allPostsDummy
    
    useEffect(()=> { //useEffect évite une boucle infinie qui pousse le composant à se recharger à fois qu'il appelle fetch.
        ApiCtx.getPosts("http://localhost:4000/api/post")
      }, []); //[] est vide car il n'ya pas d'external dependencie dans la fonction gérée par useEffect. S'il y'en avait eu, il aurait fallu les inclure dans l'array.
    console.log("loadedPosts", ApiCtx.loadedPosts)
    

    return(
    <div>
        <Header headerType = "feed"/>
        <PostListing posts = {ApiCtx.loadedPosts} title={"Fil global"} />
    </div>
    )
} 

export default Feed