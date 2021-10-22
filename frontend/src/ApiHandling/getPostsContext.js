//Ce fichier sert à créer des variables utilisables à n'importe quel endroit de l'application via createContext
import { createContext, useState } from "react";

//dummyPosts est un array de faux posts qui servent pour les tests d'affichage
const allPostsDummy =[
    {
        postId:1,
        userId:"noOne",
        title: "Loading",
        imageUrl:"defaultImage.png",
        usersUpvotes:[],
        usersDownvotes:[],
        CreatedAt: "2021-09-29 13:16:50",
        updatedAt: "2021-10-18 15:51:5",
        flagged:0
    },
]
// FetchContext est un composant React créé par nos soins. L'argument de FetchContext est sa valeur par défaut. La modification des valeurs se fait dans la constante contexte de la fonction FetchContextProvider
const GetPostsContext = createContext({
    getPosts:() =>{},
    loadedPosts:[],
});

export function GetPostsContextProvider(props) { //à chaque fois que FetchContext est modifié, son state sera modifié en temps réel par ce composant. Ce composant passe les fonctions qu'il contient et les rend accessible au reste du projet.
    const [loadedPosts, setLoadedPosts] = useState(allPostsDummy); //loadedMeetups est un array retourné par fetch depuis l'API des meetups que l'on souhaite afficher. Il est vide par défaut.
    const formatedPosts= []

    //les headers de toutes les fonction fetch get sont identiques et sont paramètrées ici. On définit init sous forme de promesse pour éviter des erreurs d'authentification au chargement de la page.
    function initPromise(){ 
        return new Promise ((resolve) => {
            const userDatas = JSON.parse(localStorage.getItem("userDatas"))
            let token = ""
            if(userDatas !== null)
                {token = userDatas.token}


            const myHeaders= new Headers({
                Authorization: "Bearer", token
            });
            console.log ("myHeaders.get", myHeaders.get("Authorization"))
            
            const fetchHeader = {
            Authorization: `Bearer ${token}`
            }
            
            const initHeader = {
                method: "GET",
                headers: fetchHeader,
                mode: 'cors',
                cache: 'default'
            }
            resolve(initHeader)
        })
    }

    //Pour afficher un post, il faut également afficher l'email de son utilisateur, on le récupère avec la route get adéquate.

    function getPosts(getUri){
                initPromise().then( (init)=>{
                    console.log("fetching posts", init.headers.Authorization)     
                    fetch(getUri, init).then(res => res.json()).then(
                        posts => {
                            posts.map(
                                //reste à gérer les emails et les listes de commentaires
                                post =>{
                                        const formatedPost = {
                                            ...post,
                                            usersUpvotes: JSON.parse(post.usersUpvotes),
                                            usersDownvotes: JSON.parse(post.usersDownvotes),
                                            createdAt: post.createdAt
                                        }
                                        formatedPosts.push(formatedPost)
                                        console.log("formated Post", formatedPost)
                                }
                            )
                            setLoadedPosts(formatedPosts)
                            }
                        )
                        
                    }
                )}

        

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