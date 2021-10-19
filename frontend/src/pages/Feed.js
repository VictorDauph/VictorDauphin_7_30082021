//importation Header
import Header from "../components/layout/Header";
import PostListing from "../components/cards/postListing"

//importation du fichier de formattage des données depuis l'API pour les posts
import allPostsDataFormating from "../components/cards/allPostsDataFormatting";

/*
const allPostsDummy = [
    {
        postId:1,
        userId:7,
        title: "test 1",
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
        title: "test 2",
        imageUrl:"defaultImage.png",
        usersUpvotes:[6,8],
        usersDownvotes:[2],
        CreatedAt: "2021-09-29 13:16:50",
        updatedAt: "2021-10-18 15:51:5",
        flagged:0
    },
]
*/

const allPosts = allPostsDataFormating()

function Feed(){
    console.log("allPosts", allPosts)
    return(
    <div>
        <Header headerType = "feed"/>
        <PostListing posts = {allPosts} />
    </div>
    )
} 

export default Feed