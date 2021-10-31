// App.js sert à gérer le routing des pages à afficher
import {Route, Switch} from "react-router-dom"; //Route est l'élément qui gère les Routes pour le différentes pages à afficher. Switch permet de n'afficher qu'une page à la fois.

//importation des pages à afficher
import SignupPage from "./pages/SignupPage"
import LoginPage from "./pages/LoginPage"
import Feed from "./pages/Feed";
import NewPost from "./pages/newPost";
import MyFeed from "./pages/myFeed";
import UserFeed from "./pages/UserFeed";

//importation du composant de protection des routes
import ProtectedRoute from "./authentification/protectedRoutes";

//function App qui sert à gérer l'affichage des pages, du header et le router
function App() {
    return (
    <div>
        <Switch>
          <Route path="/" exact component={LoginPage} />  
          <Route path="/signup" exact component={SignupPage} />
          <ProtectedRoute path="/feed" exact component={Feed}  />
          <ProtectedRoute path="/newPost" exact component={NewPost}  />
          <ProtectedRoute path="/myFeed" exact component={MyFeed}  />
          <ProtectedRoute path="/userFeed" exact component={UserFeed} />
        </Switch>
    </div>
    );
  }

  export default App;
  