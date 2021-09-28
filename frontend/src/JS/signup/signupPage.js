import React from "react";
import ReactDOM from "react-dom";
import SignupForm from "./signupForm";

class App extends React.Component {
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
        ).then(data => console.log(data)).catch(err => console.log(err)) 
    }; 
        

    render() {
        const title= "Création du compte Utilisateur";
        return(
            <div class="container">
                <div class="raw my-3 mx-3">
                    <h2 class="text-primary col-10">{title}</h2>
                </div>
                <SignupForm onUserAdd={this.handleAdd} />
            </div>
        );
    }
}

const signupContainer = document.getElementById("signupContainer");
ReactDOM.render(<App  />, signupContainer);