//Ce fichier sert à créer des variables utilisables à n'importe quel endroit de l'application via createContext
import { createContext, useState } from "react";

// AuthContext est un composant React créé par nos soins. L'argument de createContext est sa valeur par défaut. La modification des valeurs se fait dans la constante contexte de la fonction FavoritesContextProvider
//Authcontext contient les variables fonctions liées au login, logout et vérification d'authentification pour gérer les Protected Routes
export const AuthContext = createContext({});



export function AuthContextProvider(props){
    let userAuth = false

        function loginHandler(redirection,userId, token){ //en argument de login on passe une fonction de redirection qui doit être éxécutée une fois l'authentification réalisée.
            console.log("demande d'authentification")
            const userDatas = {id:userId,token:token}
            localStorage.setItem("userDatas", JSON.stringify(userDatas))
            console.log("stored userDatas", localStorage.getItem("userDatas"))
            redirection()
            
        }

        function logoutHandler(redirection){
            console.log("logging out")
            localStorage.removeItem("userDatas")
            redirection();
        }

        function checkLocalStorage(userDatas)
        {
                if (userDatas !==null){
                    console.log("setting true")
                    return true
                }
                else{
                    console.log("setting false")
                    return false
                }
        }

        function isAuthenticatedHandler(){
            const userDatas = localStorage.getItem("userDatas")
            userAuth = checkLocalStorage(userDatas) //l'utilisateur est considéré comme authentifié sur userDatas est présent dans le LocalStorage
            return userAuth;
        }

        const context = {
            authenticated:userAuth,
            login:loginHandler,
            isAuthenticated:isAuthenticatedHandler,
            logout:logoutHandler

        };

    return(<AuthContext.Provider value={context}> {/* Ce bout de code sert à passer le contenu de AuthContext au reste du projet. */}
        {props.children}
    </AuthContext.Provider>);
}

