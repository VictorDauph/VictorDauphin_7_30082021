import React from "react";
import ReactDOM from "react-dom";
import SignupForm from "./signupForm";

{
class App extends React.Component {
    state = {

        title: "Création du compte Utilisateur",
        message:"rien"
    
      };
    
    handleAdd = (user) => {
        console.log("tentative de signup from front", user)
        const requestHeaders = {"Content-Type":"application/json"};
        const requestBody = JSON.stringify({
            email: user.email,
            password: user.password
        })

        const init=
        {
            method:"POST",
            body: requestBody,
            headers: requestHeaders,
        };
        fetch("http://localhost:4000/api/account/signup",init
        ).then(res => {
            console.log("status pre-json",res.status)
            return res.json()}).then(data =>{
            this.setState({message:"message: "+data.message})//.catch(err => console.log("erreure attrappée"))
        }) 
               

    }; 
        

    render() {
        let message= ""
        return(
            <div class="container">
                <div class="raw my-3 mx-3">
                    <h2 class="text-primary col-10">{this.state.title}</h2>
                </div>
                <SignupForm onUserAdd={this.handleAdd} /> {/*  Appelle signupForm et lui indique de s'afficher ici et Rend disponible la fonction handleadd(requête Post à l'API) au sous-fichier user add qui gère le formulaire */}
                <p class="text-danger">{this.state.message}</p>
            </div>
        );
    }
}

const signupContainer = document.getElementById("signupContainer");
ReactDOM.render(<App  />, signupContainer);
}