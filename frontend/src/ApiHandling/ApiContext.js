//Ce fichier sert à créer des variables utilisables à n'importe quel endroit de l'application via createContext
import { createContext, useState, useContext} from "react";

//importation du contexte d'authentification
import { AuthContext } from "../authentification/authContext";

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
const ApiContext = createContext({
    getPosts:() =>{},
    likePost:() =>{},
    loadedPosts:[],
});

export function ApiContextProvider(props) { //à chaque fois que FetchContext est modifié, son state sera modifié en temps réel par ce composant. Ce composant passe les fonctions qu'il contient et les rend accessible au reste du projet.
    const [loadedPosts, setLoadedPosts] = useState(allPostsDummy); //loadedMeetups est un array retourné par fetch depuis l'API des meetups que l'on souhaite afficher. Il est vide par défaut.
    const formatedPosts= []

    const AuthCtx = useContext(AuthContext)

    //Pour afficher un post, il faut également afficher l'email de son utilisateur, on le récupère avec la route get adéquate.
    function getPosts(getUri){
               AuthCtx.initHeadersForFetch().then( (init)=>{
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
                })
    }

    //fonction qui permet de liker 1, unliker 0 et disliker -1 un post.
    function likePost(like,postId,userId){
        return new Promise((resolve,reject) =>{
            const body = {
                userId: userId,
                like:like
            }
            console.log("like body :",body)
            AuthCtx.initHeadersForFetch("POST",body).then( (init)=>{
                fetch(`http://localhost:4000/api/post/${postId}/like`,init).then(res => res.json()).then(
                    data => {
                        console.log("réponse like :", data.message)
                        resolve(data)
                    }
                ).catch(err=>{
                    console.log("réponse like :",err.message)
                    reject(err)
                })
            })
        })
    };
    
    
        

    const context = {
        getPosts:getPosts,
        likePost:likePost,
        loadedPosts:loadedPosts
    }; 
    
        return (<ApiContext.Provider value={context}> {/* Ce bout de code sert à passer le contenu de favorite context au reste du projet. */}
            {props.children}
        </ApiContext.Provider>
    );
}

export default ApiContext;