// App.js sert à gérer le routing des pages à afficher
import {Route, Switch} from "react-router-dom"; //Route est l'élément qui gère les Routes pour le différentes pages à afficher. Switch permet de n'afficher qu'une page à la fois.

//importation du header
import Header from "./components/layout/Header";

//importation des pages à afficher
import SignupPage from "./pages/SignupPage"
import LoginPage from "./pages/LoginPage"
import Feed from "./pages/Feed";

//importation du composant de protection des routes
import ProtectedRoute from "./authentification/protectedRoutes";

//function App qui sert à gérer l'affichage des pages, du header et le router
function App() {
    return (
    <div>
      <Header />
        <Switch>
          <Route path="/" exact component={LoginPage} />  
          <Route path="/signup" exact component={SignupPage} />
          <ProtectedRoute path="/feed" exact component={Feed} />
        </Switch>
    </div>
    );
  }

  export default App;
  