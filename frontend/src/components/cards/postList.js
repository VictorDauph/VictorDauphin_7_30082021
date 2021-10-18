import PostItem from "./postItem";

function PostList(props) {
    return (
    <div className="container">
            <h2 className="text-primary col-10">Fil Global</h2>
            {props.posts.map(post => ( //allposts est la props qui contient les données de chaque post à afficher. .map permet de traiter chaque élément du tableau les un après les autres
            <PostItem {...post}
            />
        ))}
    </div>)


}

export default PostList;

/*
                postId= {post.postId}
                userId= {post.userId}
                title= {post.title}
                imageUrl= {post.imageUrl}
                usersUpvotes= {post.usersUpvotes}
                usersDownvotes= {post.usersDownvotes}
                CreatedAt= {post.CreatedAt}
                updatedAt= {post.updatedAt}
                flagged= {post.flagged}

*/