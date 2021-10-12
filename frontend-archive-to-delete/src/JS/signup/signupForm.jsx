import React, { Component } from "react";

class SignupForm extends Component {
  state = {

    email: "" ,//cette donnée sert à stocker ce qu'il y'a ecris dans l'input du formulaire
    password:""

  };

  handleChangeEmail = (event) => {
    const value = event.currentTarget.value; //currentTarget.value est un attribut propre aux inputs et restitue le texte contenu dazns l'input.
    this.setState({email: value }); //Met à jour la valeur nouveauClient du State, à chaque frappe de clavier.
  };

  handleChangePassword = (event) => {
    const value = event.currentTarget.value; //currentTarget.value est un attribut propre aux inputs et restitue le texte contenu dazns l'input.
    this.setState({password: value }); //Met à jour la valeur nouveauClient du State, à chaque frappe de clavier.
  };

  handleSubmit = (event) => {
    event.preventDefault(); //empêche le rechargement de la page. comportement pas défaut du bouton
    const email=this.state.email;
    const password= this.state.password;
    this.props.onUserAdd({ email,password });
    this.setState({ email: "", password:"" });
  };

  render() {
    return (
      <form class="container bg-secondary" onSubmit={this.handleSubmit}>
        <div class="raw" >
        <input class="col-8 my-3"
          value={this.state.email}
          onChange={this.handleChangeEmail}
          type="text"
          placeholder="Entrez votre email"
        />
        </div>
        <div class="raw" >
        <input class="col-8 my-3"
          value={this.state.password}
          onChange={this.handleChangePassword}
          type="text"
          placeholder="Choisissez votre mot de passe"
        />
        </div>
        <div class="raw" >
        <button class="my-3 bg-dark text-primary border-0">Créer compte</button>
        </div>
      </form>   
    );
  }
}

export default SignupForm;
