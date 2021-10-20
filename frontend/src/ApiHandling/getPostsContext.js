//Ce fichier sert à créer des variables utilisables à n'importe quel endroit de l'application via createContext
import { createContext, useState } from "react";

// FetchContext est un composant React créé par nos soins. L'argument de FetchContext est sa valeur par défaut. La modification des valeurs se fait dans la constante contexte de la fonction FetchContextProvider
const GetPostsContext = createContext({
    getPosts:() =>{},
    loadedPosts:[],
});

export function GetPostsContextProvider(props) { //à chaque fois que FetchContext est modifié, son state sera modifié en temps réel par ce composant. Ce composant passe les fonctions qu'il contient et les rend accessible au reste du projet.
    const [loadedPosts, setLoadedPosts] = useState([]); //loadedMeetups est un array retourné par fetch depuis l'API des meetups que l'on souhaite afficher. Il est vide par défaut.
    const formatedPosts = []

    //les headers de toutes les fonction fetch get sont identiques et sont paramètrées ici.
    const userDatas = JSON.parse(localStorage.getItem("userDatas"))
    const userId = userDatas.id
    const token = userDatas.token

    const myHeaders= new Headers({
        Authorization: "Bearer", token
     });
    console.log ("myHeaders.get", myHeaders.get("Authorization"))
    
    const fetchHeader = {
       Authorization: `Bearer ${token}`
    }
    
    const init = {
        method: "GET",
        headers: fetchHeader,
        mode: 'cors',
        cache: 'default'
    }

    function getPosts(getUri){
                console.log("fetch Header", fetchHeader)
                fetch(getUri, init).then(res => res.json()).then(
                    posts => {
                    posts.map(
                        //reste à gérer les emails et les listes de commentaires
                        post =>{
                                const formatedPost = {
                                    email:"user@email.com",
                                    ...post
                                }
                                formatedPosts.push(formatedPost)
                                console.log("formated Post", formatedPost)
                        }
                    )
                    setLoadedPosts(formatedPosts)
                }) 
        }

    const context = {
        getPosts:getPosts,
        loadedPosts:loadedPosts
    }; 
    
        return (<GetPostsContext.Provider value={context}> {/* Ce bout de code sert à passer le contenu de favorite context au reste du projet. */}
            {props.children}
        </GetPostsContext.Provider>
    );
}

export default GetPostsContext;