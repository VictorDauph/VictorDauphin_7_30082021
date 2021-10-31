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

    //Fonction qui appelle la fonction de logout
    function logoutHandler(){
        AuthCtx.logout(redirection)
    }

    //Fonction qui appelle la fonction de suppression de compte

    function deleteAccountHandler(){
        let body = {userId:null}
        console.log("delete account")
        AuthCtx.authentifiedUserDatas().then( datas=>{
            body.userId = datas.id
            }).then( () => {
            const bodyToFetch= JSON.stringify(body)
            AuthCtx.initHeadersForFetch("DELETE",body).then(init =>{
            fetch(`http://localhost:4000/api/account/`,init).then(()=>{
                localStorage.clear("userDatas")
                history.push("/")
                }).catch(err => alert(err.message))
            })
        })            
    } 
    

    //Les fonction DropDownItem... sont des boutons utilisés dans les différents dropDownMenus des headers des différentes pages. Ils sont codés séparément car utilisés différemment selon les pages
    function DropdownItemSignup(){
        return(
            <Dropdown.Item>
                <Link className="text-decoration-none" to="/signup">Inscription d'un nouvel utilisateur</Link>
            </Dropdown.Item>
        )
    }

    function DropDownItemLogin(){
        return(
            <Dropdown.Item>
                <Link className="text-decoration-none" to="/">Connexion Utilisateur</Link>
            </Dropdown.Item>
        )
    }

    function DropDownItemCreatePost(){
        return(
            <Dropdown.Item>
                <Link className="text-decoration-none" to="/newPost">Créer Post</Link>
            </Dropdown.Item>
        )
    }

    function DropDownItemDeleteAccount(){
        return(
            <Dropdown.Item>
                <span className="text-decoration-none text-danger" onClick={deleteAccountHandler} >Supprimer compte</span>
            </Dropdown.Item>
        )
    }

    function DropDownItemMyFeed(){
        return(
            <Dropdown.Item>
                <Link className="text-decoration-none" to="/myFeed" >Mon Fil</Link>
            </Dropdown.Item>
        )
    }

    function DropDownItemLogout(){
        return(
            <Dropdown.Item>
                <p className="text-decoration-none text-primary" onClick={logoutHandler} >Logout</p>
            </Dropdown.Item>       
        )
    }

    function DropDownItemFeed(){
        return(
        <Dropdown.Item>
            <Link className="text-decoration-none" to="/feed">Fil</Link>
        </Dropdown.Item>
        )
    }

    //Les blocs conditionnels if, retournent des boutons différents pour des pages différentes

    if(props.headerType=="login"){   
        //Menu dropdown page login
    return(
        <Dropdown>
        <Dropdown.Toggle className="btn btn-secondary dropdown-toggle">
            <i className="fas fa-bars"></i> 
        </Dropdown.Toggle>
        <Dropdown.Menu className="bg-secondary">
            <DropdownItemSignup />
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
                <DropDownItemLogin />
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
                    <DropDownItemCreatePost />
                    <DropDownItemMyFeed />
                    <DropDownItemLogout />
                    <DropDownItemDeleteAccount />
                    
                </Dropdown.Menu>
            </Dropdown> 
                )
            }
            else if (props.headerType=="newPost"){
                //Menu dropdown page feed  
                return(
                    <Dropdown>
                    <Dropdown.Toggle className="btn btn-secondary dropdown-toggle">
                        <i className="fas fa-bars"></i> 
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="bg-secondary">
                        <DropDownItemFeed />
                        <DropDownItemMyFeed />
                        <DropDownItemLogout />
                        <DropDownItemDeleteAccount />
                    </Dropdown.Menu>
                </Dropdown> 
                    )
                }
                else if (props.headerType=="myFeed"){
                    //Menu dropdown page feed  
                    return(
                        <Dropdown>
                        <Dropdown.Toggle className="btn btn-secondary dropdown-toggle">
                            <i className="fas fa-bars"></i> 
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="bg-secondary">
                            <DropDownItemCreatePost />
                            <DropDownItemFeed />
                            <DropDownItemLogout />
                            <DropDownItemDeleteAccount />
                        </Dropdown.Menu>
                    </Dropdown> 
                        )
                    }
    
                    else if (props.headerType=="userFeed"){
                        //Menu dropdown page feed  
                        return(
                            <Dropdown>
                            <Dropdown.Toggle className="btn btn-secondary dropdown-toggle">
                                <i className="fas fa-bars"></i> 
                            </Dropdown.Toggle>
                            <Dropdown.Menu className="bg-secondary">
                                <DropDownItemCreatePost />
                                <DropDownItemFeed />
                                <DropDownItemMyFeed />
                                <DropDownItemLogout />
                                <DropDownItemDeleteAccount />
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