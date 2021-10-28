import PostItem from "./postItem";

function PostListing(props) {
    console.log("PostList :", props.posts)

    if(props.posts.length >0){
        return (
        <main className="container">
                <h2 className="text-primary col col-md-6 mx-auto my-5">{props.title}</h2>
                {props.posts.map(post => ( //allposts est la props qui contient les données de chaque post à afficher. .map permet de traiter chaque élément du tableau les un après les autres
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

}

export default PostListing;
