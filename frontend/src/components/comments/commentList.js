//Ce fichier dert à afficher des listes de commentaires pour la page single post et dans l'admin panel. 

import CommentItem from "./commentItem"

function CommentListing(props) {
    const commentsProps= props.comments

    console.log("List adminPanel?", props.adminPanel)
    if (commentsProps.length>0){
        const sortedComments = commentsProps.reverse()
        console.log("sorted comments", sortedComments)
        return (
            <main className="container">
                    <h2 className="text-primary col col-md-6 mx-auto my-5">{props.title}</h2>
                    {sortedComments.map(comment => ( //sortedComments est l'array qui contient les données de chaque post à afficher. .map permet de traiter chaque élément du tableau les un après les autres
                    <CommentItem {...comment} adminPanel={props.adminPanel} /> 
                ))}
            </main>
        )
    }
    else{//Le fait d'utiliser ce bloc conditionnel empêche des bugs liés à l'affichage et au mapping de listes vides
        return(
            <main className="container text-primary my-5">
                Il n'y a aucun commentaire à afficher
            </main>
        )
    }
}

export default CommentListing;
