//Ici, on utilise useState pour gérer l'affichage des promesses retournée par fetch via l'API firebase.
import {useState} from "react"

//importation Header
import Header from "../components/layout/Header";
import PostList from "../components/cards/postList"


const allPosts = [
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




function Feed(){
    const [message, changeMessage] = useState("...")
    const defaultImage = "http://localhost:4000/images/defaultImage.png"
    return(
    <div>
        <Header headerType = "feed"/>
        <PostList posts = {allPosts} />
    </div>
    )
} 

export default Feed