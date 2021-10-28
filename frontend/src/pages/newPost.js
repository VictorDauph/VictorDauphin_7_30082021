//importation des composants à afficher
import Header from "../components/layout/Header";
import CreatePostForm from "../components/forms/createPostForm";

function NewPost(){
    return(
        <main>
            <Header headerType = "newPost"/>
            <CreatePostForm />
        </main>
    )
}
export default NewPost