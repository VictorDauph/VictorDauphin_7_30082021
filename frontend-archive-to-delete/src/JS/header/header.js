import React from "react";
import ReactDOM from "react-dom";
class App extends React.Component {
    redirect(event){
        console.log(event.target.id)
        window.location.replace("./"+event.target.id);
    }

    render() {
        const title= "Groupomania";
        return(
            <div class="container">
                <div class="raw d-flex flex-row align-items-center">
                    <div class="col-1"></div>
                    <img src=".\ressources\logos\miniature-white.png" alt="logo Groupomania" class="col-1 my-3"></img>
                    <h1 class="text-light col-6">{title}</h1>
                    <div class="col-2"></div>
                    <div class="dropdown">
                        <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i class="fas fa-bars"></i>
                        </button>
                        <div class="dropdown-menu bg-secondary" aria-labelledby="Butt">
                            <p id="login" class="dropdown-item text-primary" onClick={this.redirect} href="#">Login</p>
                            <p id="signup" class="dropdown-item text-primary" onClick={this.redirect} href="#">Signup</p>
                        </div>
                    </div>
                    <div class="col-1"></div>
                </div>
            </div>
        );
    }
}

const headerElement = document.getElementById("headerDom");
ReactDOM.render(<App  />, headerElement);