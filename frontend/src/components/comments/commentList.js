import CommentItem from "./commentItem"



function CommentListing(props) {
    const commentsProps= props.comments
    const sortedComments = commentsProps.reverse()
    console.log("sorted comments", sortedComments)
    return (
        <main className="container">
                <h2 className="text-primary col col-md-6 mx-auto my-5">{props.title}</h2>
                {sortedComments.map(comment => ( //sortedComments est l'array qui contient les données de chaque post à afficher. .map permet de traiter chaque élément du tableau les un après les autres
                <CommentItem {...comment} /> 
            ))}
        </main>
    )
 



/*
    if(props.posts.length >0){
        const sortedPosts = props.posts.reverse()
        return (
        <main className="container">
                <h2 className="text-primary col col-md-6 mx-auto my-5">{props.title}</h2>
                {sortedPosts.map(post => ( //allposts est la props qui contient les données de chaque post à afficher. .map permet de traiter chaque élément du tableau les un après les autres
                <PostItem {...post} /> 
            )
            )}
        </main>
        )
    }
    if(props.posts.length <= 0){
        return(
            <main className="container text-primary my-5">
                Il n'y a aucun post à afficher
            </main>
        )
    }
*/
}

export default CommentListing;
