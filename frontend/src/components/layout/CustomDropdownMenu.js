//Importation de l'élément Dropdown de la librairie react-bootstrap
import {Dropdown} from "react-bootstrap"

//Le composant link remplace les balises <a> en React pour la navigation. En effet les <a> sont des liens qui font charger des pages, et en React on ne navigue pas de page en page, mais on modifie la page de manière dynamique avec des routes. Les links servent à gérer les routes sans envoyer de requêtes http.
import {Link} from "react-router-dom";

//importation des éléments liés aux composants contextuels
import {useContext} from "react";
import {AuthContext} from "../../authentification/authContext"; 

//Importation de useHistory pour  navigation programmatique
import { useHistory } from "react-router-dom";

function CustomDropdownMenu(props){
    console.log("headerType", props.headerType)

    const history = useHistory() //history est est utilisée pour la navigation programmatique
    const AuthCtx = useContext(AuthContext) //Authcontext contient les variables fonctions liées au login, logout et vérification d'authentification pour gérer les Protected Routes
    const redirection = () => {history.push("/");} //Cette redirection ramène sur la page de login après un logout.

    function logoutHandler(){
        AuthCtx.logout(redirection)
    }

    if(props.headerType=="login"){   
        //Menu dropdown page login
    return(
        <Dropdown>
        <Dropdown.Toggle className="btn btn-secondary dropdown-toggle">
            <i className="fas fa-bars"></i> 
        </Dropdown.Toggle>
        <Dropdown.Menu className="bg-secondary">
            <Dropdown.Item>
                <Link className="text-decoration-none" to="/signup">Signup</Link>
            </Dropdown.Item>
        </Dropdown.Menu>
    </Dropdown> 
        )
    }
    else if (props.headerType=="signup"){
        //Menu dropdown page signup   
        return(
            <Dropdown>
            <Dropdown.Toggle className="btn btn-secondary dropdown-toggle">
                <i className="fas fa-bars"></i> 
            </Dropdown.Toggle>
            <Dropdown.Menu className="bg-secondary">
                <Dropdown.Item>
                    <Link className="text-decoration-none" to="/">Login</Link>
                </Dropdown.Item>
                {/* 
                <Dropdown.Item>
                    <p className="text-decoration-none text-primary" onClick={logoutHandler} >Logout</p>
                </Dropdown.Item>
                */}
            </Dropdown.Menu>
        </Dropdown> 
            )
        }

        else if (props.headerType=="feed"){
            //Menu dropdown page feed  
            return(
                <Dropdown>
                <Dropdown.Toggle className="btn btn-secondary dropdown-toggle">
                    <i className="fas fa-bars"></i> 
                </Dropdown.Toggle>
                <Dropdown.Menu className="bg-secondary">
                    <Dropdown.Item>
                        <Link className="text-decoration-none" to="/">Login</Link>
                    </Dropdown.Item>
                    <Dropdown.Item>
                        <p className="text-decoration-none text-primary" onClick={logoutHandler} >Logout</p>
                    </Dropdown.Item>
                    <Dropdown.Item>
                        <Link className="text-decoration-none" /*to="/" */ >Mon Fil</Link>
                    </Dropdown.Item>                    
                    <Dropdown.Item>
                        <Link className="text-decoration-none text-danger" /*to="/" */ >Supprimer compte</Link>
                    </Dropdown.Item>
                    
                </Dropdown.Menu>
            </Dropdown> 
                )
            }
    
    else{
        return(
            <div>nul</div>
        )
    }
}

export default CustomDropdownMenu