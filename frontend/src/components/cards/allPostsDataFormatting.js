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

function allPostsDataFormating(){
const formatedPosts = []
    function fetchPosts(){
        console.log("fetch Header", fetchHeader)
        fetch("http://localhost:4000/api/post", init).then(res => res.json()).then(
            posts => {
            posts.map(
                //reste à gérer les emails et les listes de commentaires
                post =>{
                        const formatedPost = {
                            email:"user@email.com",
                            ...post
                        }
                        formatedPosts.push(formatedPost)
                }
            )
        }) 
    }

    
    fetchPosts()
    console.log("formatedPosts",formatedPosts)
    return formatedPosts
}

export default allPostsDataFormating