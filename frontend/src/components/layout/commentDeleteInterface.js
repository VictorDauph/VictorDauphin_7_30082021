//On affiche ce bouton seulement si l'user loggé est l'user qui a créé le post ou s'il est admin.
import { useContext,useState,useEffect } from "react";
import { AuthContext } from "../../authentification/authContext";
import ApiContext from "../../ApiHandling/ApiContext";




function CommentDeleteInterface(props){
    console.log("delete interface comment item", props)
    const AuthCtx = useContext(AuthContext)
    const ApiCtx = useContext(ApiContext)



    //On stock le logged userId dans un state car il vient d'une fonction du contexte qui a un temps de réponse trop grand pour être traité avec une variable
    const [loggedUserId,setLoggedUserId]=useState()
    AuthCtx.authentifiedUserDatas().then(userDatas =>{
        setLoggedUserId(userDatas.id)
    })

    //On a besoin de vérifier si l'utilisateur est un admin pour lui donner accès à la fonction de suppression d'un commentaire
    const isAdmin = AuthCtx.isAdmin();
    const commentId=props.commentId
    const postUserId=props.userId
    const loadedComments=ApiCtx.loadedComments


    let commentIndex = -1
    console.log("local loaded comments",loadedComments)

    //bugs avec localLoadedComments.indexOf(), on utilise donc cette fonction pour trouver l'index du post à supprimer.
    function findIndexOfComment(){
        loadedComments.map(loadedComment=>{
            const index = loadedComments.indexOf(loadedComment)
            if(loadedComment.commentId == commentId){
                commentIndex=index
                console.log("found index :", commentIndex, "of Comment :", commentId)
                
            }
        })
    }


    function deleteCommentHandler(event)
        {   
            event.preventDefault()
            console.log("deleting comment :", commentId, "loggedUserId :", loggedUserId, "postUserId", postUserId, "isAdmin :", isAdmin )
            const body={userId:loggedUserId}
            //initHeadersForFetch construit la requête à envoyer à l'API, il suffit ensuite d'appliquer la fonction fetch
            AuthCtx.initHeadersForFetch("DELETE",body).then(init =>{
                fetch(`http://localhost:4000/api/comment/${commentId}`,init).then(res => res.json()).then( ans => {
                    alert(ans.message)
                    findIndexOfComment()
                    loadedComments.splice(commentIndex,1)
                    ApiCtx.setUpdatedComments(loadedComments) //Ici y'a un truc pas net! Essayer d'utiliser un state en local?
                    console.log("pdated comments after delete :", ApiCtx.updatedComments )

                })
            })
        }
    
    if( isAdmin || loggedUserId==postUserId)
    {    
    return(
            <div className="container">
                <div className="col col-md-6 mx-auto">
                    <button className="text-white bg-danger" onClick={deleteCommentHandler} >SUPPRIMER CE COMMENTAIRE</button>
                </div>
            </div>
        )
    }
    else
    {
        return null
    }
}

export default CommentDeleteInterface